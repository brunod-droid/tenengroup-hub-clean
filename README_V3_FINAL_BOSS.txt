Replace:
- lib/yr-reporting/parser.js
- lib/yr-reporting/metrics.js
- pages/yves-rocher-reporting/weekly.js
- pages/yves-rocher-reporting/finance.js
- pages/yves-rocher-reporting/data.js

Fixes:
- orders_export.csv can now be detected because parser accepts order/shopify/order(s)
- orders count only paid orders, removes not paid/cancelled and deduplicates by Id/Name
- productivity = Antonette + Kyrene messages / Antonette + Kyrene hours
- Data page adjusted with 'remove not paid orders'
