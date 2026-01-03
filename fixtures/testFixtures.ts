import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { SmartestQAPage } from '../pages/smartestQAPage';

/**
 * Custom fixtures that extend the base Playwright test
 * These fixtures can be used across all tests
 */
type TestFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  smartestQAPage: SmartestQAPage;
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

  /**
   * Dashboard page fixture - automatically creates a DashboardPage instance
   * Usage: async ({ dashboardPage }) => { ... }
   */
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  /**
   * Smartest QA page fixture - automatically creates a SmartestQAPage instance
   * Usage: async ({ smartestQAPage }) => { ... }
   */
  smartestQAPage: async ({ page }, use) => {
    const smartestQAPage = new SmartestQAPage(page);
    await use(smartestQAPage);
  },
});

export { expect } from '@playwright/test';
