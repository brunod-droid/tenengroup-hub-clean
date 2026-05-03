import { NextResponse } from "next/server";

function checkBasicAuth(request, user, password, realm) {
  if (!user || !password) return NextResponse.next();

  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const value = basicAuth.split(" ")[1];
    const [inputUser, inputPassword] = atob(value).split(":");

    if (inputUser === user && inputPassword === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${realm}"`
    }
  });
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/yves-rocher-reporting/finance")) {
    return checkBasicAuth(
      request,
      process.env.YR_FINANCE_USER,
      process.env.YR_FINANCE_PASSWORD,
      "Yves Rocher Finance"
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/yves-rocher-reporting/finance/:path*", "/yves-rocher-reporting/finance"]
};
