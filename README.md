# Skill Gap Assessor

This repo contains two UI frontends for the Skill Gap Assessor:

- A React/Vite web app (served with Vite) under `src/`.
- A Streamlit Python app (`streamlit_app.py`) ready for local run or deployment to Streamlit Cloud.

## Run the React app (dev)

```powershell
cd "e:\M.Tech AI ML\Skill Gap Assessor"
npm install
npm run dev
```

Open the address printed by Vite (usually http://localhost:5173).

## Run the Streamlit app (local)

Use a virtual environment and install dependencies listed in `requirements.txt`.

```powershell
cd "e:\M.Tech AI ML\Skill Gap Assessor"
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r .\requirements.txt
streamlit run .\streamlit_app.py
```

Open http://localhost:8501 in your browser.

## Deploy to Streamlit Cloud (share.streamlit.io)

1. Push this repository to GitHub (public or private).
2. Go to https://share.streamlit.io and sign in with GitHub.
3. Click "New app" and select the repo, branch, and set the main file to `streamlit_app.py`.
4. Streamlit will read `requirements.txt` and `runtime.txt` and build the app automatically.

Files included to help deployment:

- `.streamlit/config.toml` — server settings for Streamlit (CORS disabled for Cloud preview).
- `requirements.txt` — required Python packages (Streamlit).
- `runtime.txt` — recommended Python runtime (3.11).

## Deploy React App to Netlify

This repo includes Netlify configuration (`netlify.toml`) and GitHub Actions deployment. To set up:

1. Create a new site on [Netlify](https://app.netlify.com)
2. Get your Netlify auth token and site ID
3. Add these secrets to your GitHub repository:
   - `NETLIFY_AUTH_TOKEN`
   - `NETLIFY_SITE_ID`

The GitHub Actions workflow will automatically deploy to Netlify when you push to main.

Manual deploy (if needed):
```powershell
npm run build
npx netlify deploy --dir=dist --prod
```

Notes:
- The React app builds to `dist/` and auto-deploys to Netlify on push to main.
- The Streamlit app uses the same normalization logic as the React app (trims, collapses spaces, removes punctuation, lowercases) so multi-word answers match correctly.

CI:

- A GitHub Actions workflow is included at `.github/workflows/ci.yml`. It installs the pinned Python runtime and verifies `pip install -r requirements.txt` and a basic `import streamlit` check. We pinned Streamlit in `requirements.txt` to `streamlit==1.28.0` for reproducible builds.


