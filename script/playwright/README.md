# Playwright Browser Workflow Automation

This folder contains a reliable Playwright-CLI workflow script for the Math Mastery app.

## What it automates

1. Opens the app at `BASE_URL`.
2. Ensures authentication by:
   - trying login first,
   - creating the user if credentials do not exist,
   - logging in again.
3. Verifies dashboard load.
4. Opens `Resume Practice` from dashboard (if shown) and captures the Question Bank page.
5. Opens `/practice`, answers one question, goes to next question, and captures screenshots.
6. Logs out and verifies redirect to `/login`.

## Prerequisites

- Node.js/npm (`npx` available)
- App running locally (default: `http://127.0.0.1:3000`)
- Playwright CLI wrapper skill installed at:
  - `$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh`

## Run

```bash
cd /Users/surajkannujiya/Desktop/Expriment/math/math-mastery-platform
bash script/playwright/auth_practice_flow.sh
```

### Optional headed mode

```bash
HEADED=1 bash script/playwright/auth_practice_flow.sh
```

### Optional custom inputs

```bash
BASE_URL="http://127.0.0.1:3000" \
E2E_USER_NAME="QA Bot" \
E2E_USER_EMAIL="qa.bot.math@example.com" \
E2E_USER_PASSWORD="StrongPass123!" \
PLAYWRIGHT_SESSION="mmqa" \
OUTPUT_DIR="$(pwd)/output/playwright/auth-practice-flow" \
bash script/playwright/auth_practice_flow.sh
```

## Output artifacts

The script writes artifacts under:

- `output/playwright/auth-practice-flow/01-dashboard.png`
- `output/playwright/auth-practice-flow/02-question-bank.png`
- `output/playwright/auth-practice-flow/03-practice-explanation.png`
- `output/playwright/auth-practice-flow/04-practice-next.png`
- `output/playwright/auth-practice-flow/05-logged-out.png`
- `output/playwright/auth-practice-flow/authenticated-state.json`
- `output/playwright/auth-practice-flow/logged-out-state.json`
