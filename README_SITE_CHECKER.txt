SITE CHECKER PACK

Add these files to your project:
- site-checker.js
- .github/workflows/site-check.yml

LOCAL CHECK ON WINDOWS

Open your project in VS Code, then Terminal:

node site-checker.js https://your-vercel-site.vercel.app

Example:
node site-checker.js https://tenengroup-hub-clean.vercel.app

It checks:
- key routes
- internal links
- images
- docs/files
- 404 errors

GITHUB AUTOMATIC CHECK

The GitHub Action runs after every push to main.

Manual production check:
GitHub > Actions > Site Checker > Run workflow

Add more routes:
Open site-checker.js and edit REQUIRED_ROUTES.
