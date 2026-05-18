Replace/add:
- pages/index.js
- public/social/napoleoncat/*
- public/debriefs/customer/*
- public/docs/NapoleonCat_Training_Public_Comments_EN_Updated.pptx

Changes:
1. New menu: Social
   - NapoleonCat training slides
   - link to Debriefs Customer
2. New menu: Debriefs
   - event-by-event Customer Service debrief deck
   - slide menu + previous/next
3. New menu: Prod Issues
   - date + free text issue submission
   - keyword search
   - localStorage key: prod_issues

Note: Prod Issues currently stores data in the browser localStorage. It is not shared between users yet. To make it shared, you will need a backend/database such as Supabase, Firebase, or a Vercel database.

Debriefs original PPTX is not included because it is over GitHub's 100MB file limit. The slides are included as optimized JPG images instead.
