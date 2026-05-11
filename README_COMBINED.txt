COMBINED PACK

1) Theograce Weekly Reporting
Add/replace:
- lib/theograce/storage.js
- lib/theograce/metrics.js
- pages/theograce/weekly-reporting.js

Then add the card/menu link in pages/index.js using:
- pages/index.js.theograce-snippet.txt

Route:
- /theograce/weekly-reporting

Important:
I cannot safely replace your full pages/index.js without the current full file, because your hub is custom and we could overwrite existing work. If you paste/send the current pages/index.js, I can return a real full annule-et-remplace index.js.

2) Yves Rocher AVERAGE agent fix
Replace:
- lib/yr-reporting/metrics.js
- pages/yves-rocher-reporting/finance.js

Fix:
- Agent rows named AVERAGE / AVG / Averages are excluded from calculations.
- AVERAGE is ignored in agent drilldown, messages, SLA and finance productivity.
