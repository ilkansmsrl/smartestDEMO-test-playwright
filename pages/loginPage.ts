import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Login Page Object Model
 * Contains all elements and actions for the login page
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly emailInput: string = '#email';
  private readonly passwordInput: string = '#password';
  private readonly loginButton: string = '#login-btn';
  private readonly errorMessage: string = '.error-message';
  private readonly successMessage: string = '.success-message';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(loginUrl: string = '/login') {
    await this.goto(loginUrl);
  }

  /**
   * Get email input field
   */
  getEmailInput(): Locator {
    return this.getElement(this.emailInput);
  }

  /**
   * Get password input field
   */
  getPasswordInput(): Locator {
    return this.getElement(this.passwordInput);
  }

  /**
   * Get login button
   */
  getLoginButton(): Locator {
    return this.getElement(this.loginButton);
  }

  /**
   * Fill email
   */
  async fillEmail(email: string) {
    await this.fill(this.emailInput, email);
  }

  /**
   * Fill password
   */
  async fillPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.click(this.loginButton);
  }

  /**
   * Perform complete login action
   */
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.successMessage);
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string | null> {
    return await this.getText(this.successMessage);
  }
}
