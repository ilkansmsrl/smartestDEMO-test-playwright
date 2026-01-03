import { Page, Locator } from '@playwright/test';

/**
 * Base Page class that contains common methods used across all page objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Get the current page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current page URL
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for a specific element to be visible
   */
  async waitForElement(selector: string, timeout: number = 30000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Click on an element
   */
  async click(selector: string) {
    await this.page.click(selector);
  }

  /**
   * Fill a text input field
   */
  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  /**
   * Check if an element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(path: string) {
    await this.page.screenshot({ path, fullPage: true });
  }

  /**
   * Get an element by its locator
   */
  getElement(selector: string): Locator {
    return this.page.locator(selector);
  }
}
