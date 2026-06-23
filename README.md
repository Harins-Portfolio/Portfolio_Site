# Portfolio Site — Local Run & Deployment

This repository contains a Vite + React landing site and simple onboarding flow that submits project requests to Supabase.

## Local development

1. Copy `.env.example` to `.env` and set your Supabase values:

```env
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

2. Install and run:

```bash
npm install
npm run dev
```

3. Open the app at `http://localhost:3000/`.

Notes:
- Admin toggle is available bottom-right of the page.
- The onboarding flow will create a `projects` row in your Supabase database. Ensure you have a `projects` table with appropriate columns matching the code.

## Deploy to Vercel (recommended)

You can deploy via the Vercel dashboard or use the included GitHub Action. Steps:

1. Create a Vercel project and link it to this GitHub repository.
2. In the Vercel project settings, add the environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

3. Alternatively, use the GitHub Action workflow included in `.github/workflows/deploy-vercel.yml`. For that you must add these GitHub repository secrets:
   - `VERCEL_TOKEN` — your Vercel personal token
   - `VERCEL_ORG_ID` — your Vercel organization ID
   - `VERCEL_PROJECT_ID` — the Vercel project ID
   - `VITE_SUPABASE_URL` — same as above
   - `VITE_SUPABASE_ANON_KEY` — same as above

To get Vercel variables:

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Login and get your token
vercel login
vercel token

# List projects
vercel projects ls
```

After adding secrets, push to `main` and the Action will deploy the site.

## Next steps I can do for you
- Configure the `projects` table schema for Supabase.
- Wire file uploads to Supabase storage.
- Finish responsive styling and accessibility fixes.
- Trigger/verify a Vercel deployment if you provide Vercel secrets.
