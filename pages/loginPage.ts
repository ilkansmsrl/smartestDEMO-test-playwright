import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Login Page Object Model
 * Contains all elements and actions for the login page
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly usernameInput: string = '#username';
  private readonly passwordInput: string = '#password';
  private readonly loginButton: string = 'button[type="submit"]';
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
   * Get username input field
   */
  getUsernameInput(): Locator {
    return this.getElement(this.usernameInput);
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
   * Fill username
   */
  async fillUsername(username: string) {
    await this.fill(this.usernameInput, username);
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
  async login(username: string, password: string) {
    await this.fillUsername(username);
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
