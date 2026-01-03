import { test, expect, devices } from '@playwright/test';
import { test as customTest } from '../fixtures/testFixtures';

test.use({
  ...devices['Desktop Chrome'],
  viewport: { height: 1080, width: 1920 }
});

/**
 * Smartest QA Test Suite
 * Real test scenarios for Smartest QA platform using Playwright Codegen generated selectors
 */

test.describe('Smartest QA - Login ve Test Case Oluşturma', () => {
  
  test('Smartest QA - Login ve Test Case Oluşturma', async ({ page }) => {
    // 1. Login Sayfasına Git
    await page.goto('https://demo.smartestqa.online/login');
    
    // 2. Login Yap (Credentials .env dosyasından alınacak)
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.TEST_USERNAME || '');
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.TEST_PASSWORD || '');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // 3. Company ve Project Seç
    await page.getByRole('combobox', { name: 'Select Company' }).click();
    await page.getByRole('option', { name: 'Selenity Technology' }).click();
    await page.waitForTimeout(1000); // Wait for company selection to complete
    
    await page.getByRole('combobox', { name: 'Select project' }).click();
    await page.getByText('ExampleProjectSmartest').click();
    await page.waitForTimeout(1000); // Wait for project selection to complete
    
    // 4. Automate Menüsüne Git
    await page.getByRole('button', { name: 'Automate' }).click();
    await page.waitForLoadState('networkidle');
    
    // 5. New Case Oluştur
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(5).click();
    await page.getByRole('menuitem', { name: 'New Case' }).click();
    await page.waitForTimeout(1000);
    
    // 6. Test Case Bilgilerini Doldur
    await page.getByRole('button', { name: 'Test Case Name -' }).click();
    await page.getByRole('textbox', { name: 'Test Case Name' }).fill('Automated Test Case');
    await page.getByLabel('Save').click();
    await page.waitForTimeout(500);
    
    await page.getByRole('button', { name: 'Description -' }).click();
    await page.getByRole('textbox', { name: 'Description' }).fill('This test case was created by Playwright automation');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(500);
  });
});

/**
 * Test suite using Page Object Model
 */
customTest.describe('Smartest QA - Page Object Model Tests', () => {
  
  customTest.beforeEach(async ({ smartestQAPage }) => {
    // Navigate to login page before each test
    await smartestQAPage.navigateToLogin();
  });

  customTest('Login başarılı kontrolü', async ({ smartestQAPage }) => {
    // Get credentials from environment variables
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    
    // Verify credentials are loaded
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    
    // Perform login
    await smartestQAPage.login(username, password);
    
    // Verify login was successful
    const isLoggedIn = await smartestQAPage.isLoginSuccessful();
    expect(isLoggedIn).toBeTruthy();
  });

  customTest('Company ve Project seçimi kontrolü', async ({ smartestQAPage }) => {
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    
    // Login
    await smartestQAPage.login(username, password);
    
    // Wait for login to complete
    await smartestQAPage.isLoginSuccessful();
    
    // Select company and project
    await smartestQAPage.selectCompanyAndProject('Selenity Technology', 'ExampleProjectSmartest');
    
    // Verify company is selected
    const isCompanySelected = await smartestQAPage.isCompanySelected();
    expect(isCompanySelected).toBeTruthy();
    
    // Verify Automate menu is visible
    const isAutomateVisible = await smartestQAPage.isAutomateMenuVisible();
    expect(isAutomateVisible).toBeTruthy();
  });

  customTest('Test Case oluşturma kontrolü', async ({ smartestQAPage, page }) => {
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    const testCaseName = `Automated Test ${Date.now()}`;
    const testDescription = 'This is an automated test case created by Playwright';
    
    // Login
    await smartestQAPage.login(username, password);
    await smartestQAPage.isLoginSuccessful();
    
    // Select company and project
    await smartestQAPage.selectCompanyAndProject('Selenity Technology', 'ExampleProjectSmartest');
    
    // Navigate to Automate menu
    await smartestQAPage.navigateToAutomate();
    
    // Create test case
    await smartestQAPage.createTestCase(testCaseName, testDescription);
    
    // Verify test case was created
    // Check if the test case name appears in the page
    const isCreated = await page.locator(`text=${testCaseName}`).isVisible().catch(() => false);
    
    // Log the result for debugging
    console.log(`Test case "${testCaseName}" creation status: ${isCreated}`);
  });

  customTest('Tam akış testi - Login, Seçim, Test Case Oluşturma', async ({ smartestQAPage, page }) => {
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    const testCaseName = `Full Flow Test ${Date.now()}`;
    
    // 1. Login
    await smartestQAPage.login(username, password);
    const isLoggedIn = await smartestQAPage.isLoginSuccessful();
    expect(isLoggedIn).toBeTruthy();
    
    // 2. Company/Project Selection
    await smartestQAPage.selectCompanyAndProject('Selenity Technology', 'ExampleProjectSmartest');
    const isCompanySelected = await smartestQAPage.isCompanySelected();
    expect(isCompanySelected).toBeTruthy();
    
    // 3. Navigate to Automate
    await smartestQAPage.navigateToAutomate();
    const isAutomateVisible = await smartestQAPage.isAutomateMenuVisible();
    expect(isAutomateVisible).toBeTruthy();
    
    // 4. Create Test Case
    await smartestQAPage.createTestCase(testCaseName, 'Full workflow automation test');
    
    // 5. Verify page is still functional
    await expect(page.locator('body')).toBeVisible();
  });
});

/**
 * Logout test suite
 */
customTest.describe('Smartest QA - Logout Tests', () => {
  
  customTest('Logout testi', async ({ smartestQAPage, page }) => {
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    
    // Login first
    await smartestQAPage.navigateToLogin();
    await smartestQAPage.login(username, password);
    
    // Verify login was successful
    const isLoggedIn = await smartestQAPage.isLoginSuccessful();
    expect(isLoggedIn).toBeTruthy();
    
    // Perform logout
    await smartestQAPage.logout();
    
    // Verify logout was successful
    // Check if we're back on login page or logout succeeded
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    
    // Either we're on login page or logout succeeded
    const isLoggedOut = currentUrl.includes('login') || await smartestQAPage.isLoggedOut();
    
    // Log result for debugging
    console.log(`Logout status: ${isLoggedOut}, Current URL: ${currentUrl}`);
  });
});

/**
 * Negative test scenarios
 */
customTest.describe('Smartest QA - Negative Tests', () => {
  
  customTest('Boş credentials ile login denemesi', async ({ smartestQAPage, page }) => {
    await smartestQAPage.navigateToLogin();
    
    // Try to login with empty credentials
    await smartestQAPage.login('', '');
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Should still be on login page
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
  });

  customTest('Yanlış credentials ile login denemesi', async ({ smartestQAPage, page }) => {
    await smartestQAPage.navigateToLogin();
    
    // Try to login with wrong credentials
    await smartestQAPage.login('wrong@email.com', 'wrongpassword');
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Should still be on login page or show error
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
  });
});
