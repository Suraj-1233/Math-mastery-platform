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

if ! command -v node >/dev/null 2>&1; then
  echo "Error: node is required but not found on PATH." >&2
  exit 1
fi

CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
PWCLI="${PWCLI:-$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh}"

if [[ ! -x "$PWCLI" ]]; then
  echo "Error: Playwright wrapper not found or not executable: $PWCLI" >&2
  exit 1
fi

BASE_URL="${BASE_URL:-http://localhost:3000}"
PLAYWRIGHT_SESSION="${PLAYWRIGHT_SESSION:-mmflow}"
HEADED="${HEADED:-0}"
E2E_USER_NAME="${E2E_USER_NAME:-Codex Browser User}"
E2E_USER_EMAIL="${E2E_USER_EMAIL:-codex.math.mastery@example.com}"
E2E_USER_PASSWORD="${E2E_USER_PASSWORD:-CodexPass123!}"
OUTPUT_DIR="${OUTPUT_DIR:-$(pwd)/output/playwright/auth-practice-flow}"

mkdir -p "$OUTPUT_DIR"

export PLAYWRIGHT_CLI_SESSION="$PLAYWRIGHT_SESSION"

js_escape() {
  node -e 'process.stdout.write(JSON.stringify(process.argv[1]))' "$1"
}

run_pwcli() {
  local output
  if ! output="$("$PWCLI" "$@" 2>&1)"; then
    printf '%s\n' "$output"
    return 1
  fi

  printf '%s\n' "$output"

  if grep -q '^### Error' <<<"$output"; then
    return 1
  fi
}

BASE_URL_JS="$(js_escape "$BASE_URL")"
E2E_USER_NAME_JS="$(js_escape "$E2E_USER_NAME")"
E2E_USER_EMAIL_JS="$(js_escape "$E2E_USER_EMAIL")"
E2E_USER_PASSWORD_JS="$(js_escape "$E2E_USER_PASSWORD")"
OUTPUT_DIR_JS="$(js_escape "$OUTPUT_DIR")"

open_args=(open "$BASE_URL")
if [[ "$HEADED" == "1" ]]; then
  open_args+=(--headed)
fi

run_pwcli "${open_args[@]}"
trap '"$PWCLI" close >/dev/null 2>&1 || true' EXIT

WAIT_FOR_APP_TEMPLATE="$(cat <<'JS'
async (page) => {
  const baseUrl = __BASE_URL__;
  const deadline = Date.now() + 45000;
  let lastError = 'unknown error';

  while (Date.now() < deadline) {
    try {
      const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      if (response && response.ok()) {
        await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

        const hasExpectedAppMarker =
          (await page.getByRole('link', { name: 'Get started' }).first().isVisible().catch(() => false)) ||
          (await page.getByText('Master Government Exams with Confidence').first().isVisible().catch(() => false)) ||
          (await page.getByText('Math Mastery').first().isVisible().catch(() => false));

        if (hasExpectedAppMarker) {
          return;
        }

        lastError = 'Server responded but expected Math Mastery app markers were not found.';
      } else {
        lastError = `HTTP ${response ? response.status() : 'no-response'}`;
      }
    } catch (error) {
      lastError = String(error);
    }

    await page.waitForTimeout(1500);
  }

  throw new Error(`App verification failed for ${baseUrl}. Last error: ${lastError}`);
}
JS
)"
WAIT_FOR_APP_CODE="${WAIT_FOR_APP_TEMPLATE//__BASE_URL__/$BASE_URL_JS}"
run_pwcli run-code "$WAIT_FOR_APP_CODE"

AUTH_FLOW_TEMPLATE="$(cat <<'JS'
async (page) => {
  const baseUrl = __BASE_URL__;
  const name = __USER_NAME__;
  const email = __USER_EMAIL__;
  const password = __USER_PASSWORD__;
  const timeout = 25000;

  const appUrl = (path) => {
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const route = path.startsWith('/') ? path : `/${path}`;
    return `${base}${route}`;
  };

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

  const onAuthenticatedPage = async () => {
    if (page.url().includes('/login') || page.url().includes('/signup')) return false;
    return page.getByRole('button', { name: 'Log out' }).first().isVisible().catch(() => false);
  };

  const login = async () => {
    await goto('/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (await onAuthenticatedPage()) return 'success';
      if (await visibleText('Invalid credentials.')) return 'invalid';
      if (await visibleText('Something went wrong.')) return 'error';
      await page.waitForTimeout(250);
    }

    return (await onAuthenticatedPage()) ? 'success' : 'timeout';
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
  if (await onAuthenticatedPage()) return;

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

  if (await onAuthenticatedPage()) return;
  throw new Error(`Login flow failed with result: ${loginResult}`);
}
JS
)"
AUTH_FLOW_CODE="${AUTH_FLOW_TEMPLATE//__BASE_URL__/$BASE_URL_JS}"
AUTH_FLOW_CODE="${AUTH_FLOW_CODE//__USER_NAME__/$E2E_USER_NAME_JS}"
AUTH_FLOW_CODE="${AUTH_FLOW_CODE//__USER_EMAIL__/$E2E_USER_EMAIL_JS}"
AUTH_FLOW_CODE="${AUTH_FLOW_CODE//__USER_PASSWORD__/$E2E_USER_PASSWORD_JS}"
run_pwcli run-code "$AUTH_FLOW_CODE"
run_pwcli state-save "$OUTPUT_DIR/authenticated-state.json"

BROWSER_FLOW_TEMPLATE="$(cat <<'JS'
async (page) => {
  const baseUrl = __BASE_URL__;
  const outputDir = __OUTPUT_DIR__;
  const timeout = 25000;

  const appUrl = (path) => {
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const route = path.startsWith('/') ? path : `/${path}`;
    return `${base}${route}`;
  };
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

  await page.goto(appUrl('/api/auth/signout?callbackUrl=/login'), { waitUntil: 'domcontentloaded', timeout });
  await settle();
  const signoutButton = page.getByRole('button', { name: 'Sign out' }).first();
  if (await signoutButton.isVisible().catch(() => false)) {
    await signoutButton.click();
  }
  const loggedOut = await (async () => {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if (page.url().includes('/login')) return true;
      const hasLoginHeading = await page.getByRole('heading', { name: 'Welcome Back' }).first().isVisible().catch(() => false);
      if (hasLoginHeading) return true;
      await page.waitForTimeout(250);
    }
    return false;
  })();

  if (!loggedOut) {
    throw new Error(`Logout did not redirect to login. Current URL: ${page.url()}`);
  }
  await page.screenshot({ path: `${outputDir}/05-logged-out.png`, fullPage: true });
}
JS
)"
BROWSER_FLOW_CODE="${BROWSER_FLOW_TEMPLATE//__BASE_URL__/$BASE_URL_JS}"
BROWSER_FLOW_CODE="${BROWSER_FLOW_CODE//__OUTPUT_DIR__/$OUTPUT_DIR_JS}"
run_pwcli run-code "$BROWSER_FLOW_CODE"
run_pwcli state-save "$OUTPUT_DIR/logged-out-state.json"

printf 'Workflow completed successfully. Artifacts saved in %s\n' "$OUTPUT_DIR"
