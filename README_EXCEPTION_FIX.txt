Replace/add:

Replace:
- pages/index.js

Add/keep:
- pages/training/ai-customer-service.js

What was wrong:
- pages/index.js was calling <TrainingMenu /> but the TrainingMenu component was missing.
- This caused the client-side exception when clicking Training.

This version includes the missing TrainingMenu component.
