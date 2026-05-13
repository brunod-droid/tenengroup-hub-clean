const DEFAULT_BASE_URL = "http://localhost:3000";

const REQUIRED_ROUTES = [
  "/",
  "/theograce/weekly-reporting",
  "/theograce/monthly-reporting",
  "/theograce/history",
  "/yves-rocher-reporting",
  "/yves-rocher-reporting/upload",
  "/yves-rocher-reporting/weekly",
  "/yves-rocher-reporting/monthly",
  "/yves-rocher-reporting/history",
  "/yves-rocher-reporting/settings",
  "/yves-rocher-reporting/data"
];

const IGNORE_PATTERNS = [
  /^mailto:/i,
  /^tel:/i,
  /^javascript:/i,
  /^#/,
  /tenengroup\.kustomerapp\.com/i,
  /bo\.tenengroup\.com/i,
  /aftership\.com/i,
  /17track\.net/i,
  /getnotch\.com/i,
  /matrix\.tenengroup\.com/i
];

function normalizeBaseUrl(input) {
  return String(input || DEFAULT_BASE_URL).replace(/\/+$/, "");
}

function isIgnored(url) {
  return IGNORE_PATTERNS.some((pattern) => pattern.test(url));
}

function makeUrl(baseUrl, pathOrUrl) {
  if (!pathOrUrl || isIgnored(pathOrUrl)) return null;

  try {
    if (/^https?:\/\//i.test(pathOrUrl)) {
      const url = new URL(pathOrUrl);
      const base = new URL(baseUrl);
      if (url.hostname !== base.hostname) return null;
      return url.href;
    }

    if (pathOrUrl.startsWith("/")) return `${baseUrl}${pathOrUrl}`;
    return new URL(pathOrUrl, `${baseUrl}/`).href;
  } catch {
    return null;
  }
}

async function checkUrl(url) {
  try {
    const response = await fetch(url, { method: "GET", redirect: "follow" });
    const contentType = response.headers.get("content-type") || "";
    return {
      url,
      status: response.status,
      ok: response.status >= 200 && response.status < 400,
      contentType,
      text: contentType.includes("text/html") ? await response.text() : ""
    };
  } catch (error) {
    return {
      url,
      status: "ERROR",
      ok: false,
      contentType: "",
      text: "",
      error: error.message
    };
  }
}

function extractInternalReferences(html, baseUrl) {
  const refs = new Set();
  const patterns = [
    /href=["']([^"']+)["']/gi,
    /src=["']([^"']+)["']/gi,
    /url\(["']?([^"')]+)["']?\)/gi
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const raw = match[1];
      const url = makeUrl(baseUrl, raw);
      if (url) refs.add(url);
    }
  }

  return [...refs];
}

function shortUrl(url, baseUrl) {
  return url.replace(baseUrl, "") || "/";
}

async function main() {
  const baseUrl = normalizeBaseUrl(process.argv[2]);
  const visited = new Set();
  const failures = [];
  const warnings = [];

  console.log(`\nChecking site: ${baseUrl}\n`);

  const requiredUrls = REQUIRED_ROUTES.map((route) => `${baseUrl}${route}`);
  const queue = [...requiredUrls];

  while (queue.length) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);

    const result = await checkUrl(url);
    const label = shortUrl(url, baseUrl);

    if (!result.ok) {
      failures.push({
        type: "BROKEN_URL",
        url: label,
        status: result.status,
        error: result.error || ""
      });
      console.log(`FAIL ${label} - ${result.status}`);
      continue;
    }

    console.log(`OK ${label} - ${result.status}`);

    if (result.contentType.includes("text/html")) {
      const refs = extractInternalReferences(result.text, baseUrl);

      for (const ref of refs) {
        if (!visited.has(ref) && ref.startsWith(baseUrl)) {
          const path = shortUrl(ref, baseUrl);
          if (path.startsWith("/_next/webpack") || path.includes("__nextjs") || path.includes("hot-update")) {
            continue;
          }
          queue.push(ref);
        }
      }

      if (result.text.includes("404") && label !== "/404") {
        warnings.push({
          type: "POSSIBLE_404_TEXT",
          url: label,
          message: "Page contains text 404. Verify manually if expected."
        });
      }
    }
  }

  console.log("\n==============================");
  console.log("SITE CHECK REPORT");
  console.log("==============================");
  console.log(`Checked URLs/assets: ${visited.size}`);
  console.log(`Failures: ${failures.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (failures.length) {
    console.log("\nFAILURES");
    for (const failure of failures) {
      console.log(`- ${failure.url} - ${failure.status}${failure.error ? ` - ${failure.error}` : ""}`);
    }
  }

  if (warnings.length) {
    console.log("\nWARNINGS");
    for (const warning of warnings) {
      console.log(`- ${warning.url} - ${warning.message}`);
    }
  }

  if (failures.length) {
    console.log("\nResult: FAILED");
    process.exit(1);
  }

  console.log("\nResult: PASSED");
}

main();
