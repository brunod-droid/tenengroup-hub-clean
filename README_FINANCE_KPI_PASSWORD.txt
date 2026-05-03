Replace/add:
- pages/yves-rocher-reporting/finance.js
- middleware.js

Finance KPIs:
1. CSR Hours = sum of agent hours
2. CSR Cost = sum(agent hours × cost per hour)
3. Order Cost = CSR Cost / orders
4. Productivity = messages sent / CSR hour

Expected finance CSV columns:
Agent, Hours, Cost per hour

Example:
Agent,Hours,Cost per hour
Antonette,40,12
Kyrene,38,12
Neva,8,18
Roi,5,20
Notch (Taylor),0,0

Password:
Default password is YRFinance.
On Vercel, recommended env variable:
YR_FINANCE_PASSWORD=YRFinance

Important:
Browser Basic Auth asks for username + password.
Username can be anything.
Password must be YRFinance.
