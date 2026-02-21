#!/usr/bin/env bash
set -euo pipefail

if ! command -v npx >/dev/null 2>&1; then
  cat >&2 <<'MISSING_NPX'
Error: npx is required but not found on PATH.

Install Node.js/npm first, then run:
  npm install -g @playwright/cli@latest
  playwright-cli --help
MISSING_NPX
  exit 1
fi

CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
PWCLI="${PWCLI:-$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh}"

if [[ ! -x "$PWCLI" ]]; then
  echo "Error: Playwright wrapper not found or not executable: $PWCLI" >&2
  exit 1
fi

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
PLAYWRIGHT_SESSION="${PLAYWRIGHT_SESSION:-math-mastery-auth-practice}"
HEADED="${HEADED:-0}"
E2E_USER_NAME="${E2E_USER_NAME:-Codex Browser User}"
E2E_USER_EMAIL="${E2E_USER_EMAIL:-codex.math.mastery@example.com}"
E2E_USER_PASSWORD="${E2E_USER_PASSWORD:-CodexPass123!}"
OUTPUT_DIR="${OUTPUT_DIR:-$(pwd)/output/playwright/auth-practice-flow}"

mkdir -p "$OUTPUT_DIR"

export BASE_URL E2E_USER_NAME E2E_USER_EMAIL E2E_USER_PASSWORD OUTPUT_DIR
export PLAYWRIGHT_CLI_SESSION="$PLAYWRIGHT_SESSION"

open_args=(open "$BASE_URL")
if [[ "$HEADED" == "1" ]]; then
  open_args+=(--headed)
fi

"$PWCLI" "${open_args[@]}"
trap '"$PWCLI" close >/dev/null 2>&1 || true' EXIT

WAIT_FOR_APP_CODE="$(cat <<'JS'
async (page) => {
  const baseUrl = process.env.BASE_URL;
  const deadline = Date.now() + 45000;
  let lastError = 'unknown error';

  while (Date.now() < deadline) {
    try {
      const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      if (response && response.ok()) {
        await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
        return;
      }
      lastError = `HTTP ${response ? response.status() : 'no-response'}`;
    } catch (error) {
      lastError = String(error);
    }
    await page.waitForTimeout(1500);
  }

  throw new Error(`App not reachable at ${baseUrl}. Last error: ${lastError}`);
}
JS
)"
"$PWCLI" run-code "$WAIT_FOR_APP_CODE"

AUTH_FLOW_CODE="$(cat <<'JS'
async (page) => {
  const baseUrl = process.env.BASE_URL;
  const name = process.env.E2E_USER_NAME;
  const email = process.env.E2E_USER_EMAIL;
  const password = process.env.E2E_USER_PASSWORD;
  const timeout = 25000;

  const appUrl = (path) => new URL(path, baseUrl).toString();

  const settle = async () => {
    await page.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 7000 }).catch(() => {});
  };

  const goto = async (path) => {
    await page.goto(appUrl(path), { waitUntil: 'domcontentloaded', timeout });
    await settle();
  };

  const visibleText = async (text) => {
    return page.getByText(text, { exact: false }).first().isVisible().catch(() => false);
  };

  const onDashboard = async () => {
    if (page.url().includes('/dashboard')) return true;
    return page.getByRole('heading', { name: 'Dashboard' }).first().isVisible().catch(() => false);
  };

  const login = async () => {
    await goto('/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (await onDashboard()) return 'success';
      if (await visibleText('Invalid credentials.')) return 'invalid';
      if (await visibleText('Something went wrong.')) return 'error';
      await page.waitForTimeout(250);
    }

    return (await onDashboard()) ? 'success' : 'timeout';
  };

  const signup = async () => {
    await goto('/signup');
    await page.getByLabel('Name').fill(name);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Create Account' }).click();

    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (page.url().includes('/login')) return 'created';
      if (await visibleText('User already exists.')) return 'exists';
      if (await visibleText('Failed to create user.')) return 'failed';
      if (await visibleText('Invalid input.')) return 'invalid-input';
      await page.waitForTimeout(250);
    }

    return page.url().includes('/login') ? 'created' : 'timeout';
  };

  await goto('/dashboard');
  if (await onDashboard()) return;

  let loginResult = await login();
  if (loginResult === 'success') return;

  if (loginResult === 'invalid') {
    const signupResult = await signup();
    if (!['created', 'exists'].includes(signupResult)) {
      throw new Error(`Signup failed with result: ${signupResult}`);
    }

    loginResult = await login();
    if (loginResult === 'success') return;

    throw new Error(`Login after signup failed with result: ${loginResult}`);
  }

  if (await onDashboard()) return;
  throw new Error(`Login flow failed with result: ${loginResult}`);
}
JS
)"
"$PWCLI" run-code "$AUTH_FLOW_CODE"
"$PWCLI" state-save "$OUTPUT_DIR/authenticated-state.json"

BROWSER_FLOW_CODE="$(cat <<'JS'
async (page) => {
  const baseUrl = process.env.BASE_URL;
  const outputDir = process.env.OUTPUT_DIR;
  const timeout = 25000;

  const appUrl = (path) => new URL(path, baseUrl).toString();
  const settle = async () => {
    await page.waitForLoadState('domcontentloaded', { timeout }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 7000 }).catch(() => {});
  };

  await page.goto(appUrl('/dashboard'), { waitUntil: 'domcontentloaded', timeout });
  await settle();
  await page.getByRole('heading', { name: 'Dashboard' }).first().waitFor({ state: 'visible', timeout });
  await page.screenshot({ path: `${outputDir}/01-dashboard.png`, fullPage: true });

  const resumePractice = page.getByRole('link', { name: 'Resume Practice' }).first();
  if (await resumePractice.isVisible().catch(() => false)) {
    await resumePractice.click();
    await page.getByRole('heading', { name: 'Question Bank' }).first().waitFor({ state: 'visible', timeout });
    await page.screenshot({ path: `${outputDir}/02-question-bank.png`, fullPage: true });
  }

  await page.goto(appUrl('/practice'), { waitUntil: 'domcontentloaded', timeout });
  await settle();
  await page.getByRole('heading', { name: 'Math Mastery' }).first().waitFor({ state: 'visible', timeout });

  const firstOption = page.locator('button.w-full.text-left').first();
  await firstOption.waitFor({ state: 'visible', timeout });
  await firstOption.click();

  await page.getByRole('heading', { name: /Explanation/i }).first().waitFor({ state: 'visible', timeout });
  await page.screenshot({ path: `${outputDir}/03-practice-explanation.png`, fullPage: true });

  const nextButton = page.getByRole('button', { name: /Next/i }).first();
  if (await nextButton.isEnabled().catch(() => false)) {
    await nextButton.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${outputDir}/04-practice-next.png`, fullPage: true });
  }

  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });

  const logoutButton = page.getByRole('button', { name: 'Log out' }).first();
  await logoutButton.waitFor({ state: 'visible', timeout });
  await logoutButton.click();

  await page.waitForURL(/\/login/, { timeout });
  await page.screenshot({ path: `${outputDir}/05-logged-out.png`, fullPage: true });
}
JS
)"
"$PWCLI" run-code "$BROWSER_FLOW_CODE"
"$PWCLI" state-save "$OUTPUT_DIR/logged-out-state.json"

printf 'Workflow completed successfully. Artifacts saved in %s\n' "$OUTPUT_DIR"
