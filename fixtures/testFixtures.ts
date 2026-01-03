import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

/**
 * Custom fixtures that extend the base Playwright test
 * These fixtures can be used across all tests
 */
type TestFixtures = {
  loginPage: LoginPage;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  /**
   * Login page fixture - automatically creates a LoginPage instance
   * Usage: async ({ loginPage }) => { ... }
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
