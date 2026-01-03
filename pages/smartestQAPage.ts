import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Smartest QA Page Object Model
 * Contains all elements and actions for Smartest QA platform
 */
export class SmartestQAPage extends BasePage {
  // Login selectors
  private readonly emailInput: string = 'input[name="Email"]';
  private readonly passwordInput: string = 'input[name="Password"]';
  private readonly loginButton: string = 'button:has-text("Login")';
  
  // Company and Project selectors
  private readonly companySelect: string = 'select[name="Select Company"], [role="combobox"][name="Select Company"]';
  private readonly projectSelect: string = 'select[name="Select project"], [role="combobox"][name="Select project"]';
  
  // Navigation selectors
  private readonly automateButton: string = 'button:has-text("Automate")';
  
  // Test Case creation selectors
  private readonly newCaseButton: string = '[role="button"]';
  private readonly newCaseMenuItem: string = '[role="menuitem"]:has-text("New Case")';
  private readonly testCaseNameButton: string = 'button:has-text("Test Case Name")';
  private readonly testCaseNameInput: string = 'input[name="Test Case Name"]';
  private readonly descriptionButton: string = 'button:has-text("Description")';
  private readonly descriptionInput: string = 'textarea[name="Description"], input[name="Description"]';
  private readonly saveButton: string = 'button:has-text("Save"), [aria-label="Save"]';
  
  // Logout selector
  private readonly logoutButton: string = 'button:has-text("Logout"), a:has-text("Logout")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Smartest QA login page
   */
  async navigateToLogin(url: string = 'https://demo.smartestqa.online/login') {
    await this.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  /**
   * Perform complete login action
   */
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
    // Wait for navigation after login
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  /**
   * Select company from dropdown
   */
  async selectCompany(companyName: string) {
    await this.page.getByRole('combobox', { name: 'Select Company' }).click();
    await this.page.getByRole('option', { name: companyName }).click();
    // Wait for project dropdown to be ready
    await this.page.waitForTimeout(1000);
  }

  /**
   * Select project from dropdown
   */
  async selectProject(projectName: string) {
    await this.page.getByRole('combobox', { name: 'Select project' }).click();
    await this.page.getByText(projectName).click();
    // Wait for selection to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Select both company and project
   */
  async selectCompanyAndProject(companyName: string, projectName: string) {
    await this.selectCompany(companyName);
    await this.selectProject(projectName);
  }

  /**
   * Navigate to Automate menu
   */
  async navigateToAutomate() {
    await this.page.getByRole('button', { name: 'Automate' }).click();
    await this.waitForPageLoad();
  }

  /**
   * Click New Case button
   */
  async clickNewCase() {
    // Click the button with empty text (as per selector in requirements)
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(5).click();
    await this.page.getByRole('menuitem', { name: 'New Case' }).click();
    // Wait for form to load
    await this.page.waitForTimeout(1000);
  }

  /**
   * Fill test case name
   */
  async fillTestCaseName(name: string) {
    await this.page.getByRole('button', { name: 'Test Case Name -' }).click();
    await this.page.getByRole('textbox', { name: 'Test Case Name' }).fill(name);
    await this.page.getByLabel('Save').click();
    // Wait for save to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Fill test case description
   */
  async fillDescription(description: string) {
    await this.page.getByRole('button', { name: 'Description -' }).click();
    await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
    await this.page.getByRole('button', { name: 'Save' }).click();
    // Wait for save to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Create a complete test case
   */
  async createTestCase(name: string, description: string) {
    await this.clickNewCase();
    await this.fillTestCaseName(name);
    await this.fillDescription(description);
  }

  /**
   * Check if login was successful (company select is visible)
   */
  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.page.waitForSelector('[role="combobox"][name="Select Company"]', { 
        state: 'visible', 
        timeout: 10000 
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if company is selected
   */
  async isCompanySelected(): Promise<boolean> {
    // After company selection, project dropdown should be available
    return await this.page.getByRole('combobox', { name: 'Select project' }).isVisible();
  }

  /**
   * Check if Automate menu is accessible
   */
  async isAutomateMenuVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Automate' }).isVisible();
  }

  /**
   * Check if test case was created successfully
   */
  async isTestCaseCreated(testCaseName: string): Promise<boolean> {
    try {
      // Wait for the test case name to appear in the UI
      await this.page.waitForSelector(`text=${testCaseName}`, { 
        state: 'visible', 
        timeout: 5000 
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Perform logout
   */
  async logout() {
    // Try to find and click logout button
    const logoutBtn = this.page.locator(this.logoutButton).first();
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Check if user is logged out (login page is visible)
   */
  async isLoggedOut(): Promise<boolean> {
    try {
      await this.page.waitForSelector('[role="button"]:has-text("Login")', { 
        state: 'visible', 
        timeout: 5000 
      });
      return true;
    } catch {
      return false;
    }
  }
}
