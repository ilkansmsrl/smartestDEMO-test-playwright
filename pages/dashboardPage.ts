import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Dashboard Page Object Model
 * Contains all elements and actions for the dashboard page
 */
export class DashboardPage extends BasePage {
  // Selectors for common dashboard elements
  private readonly dashboardHeader: string = 'header, [role="banner"]';
  private readonly userMenu: string = '.user-menu, [data-testid="user-menu"]';
  private readonly userProfile: string = '.user-profile, [data-testid="user-profile"]';
  private readonly logoutButton: string = 'button:has-text("Logout"), a:has-text("Logout"), [data-testid="logout"]';
  
  // Navigation menu selectors
  private readonly mainMenu: string = 'nav, [role="navigation"]';
  private readonly menuItems: string = 'nav a, [role="navigation"] a';
  
  // Dashboard content selectors
  private readonly dashboardTitle: string = 'h1, .dashboard-title';
  private readonly statsCards: string = '.stats-card, .card, [data-testid="stats-card"]';
  private readonly dataTable: string = 'table, .data-table, [data-testid="data-table"]';
  private readonly searchInput: string = 'input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]';
  private readonly filterButton: string = 'button:has-text("Filter"), [data-testid="filter-button"]';
  
  // Action buttons
  private readonly addButton: string = 'button:has-text("Add"), button:has-text("Create"), [data-testid="add-button"]';
  private readonly editButton: string = 'button:has-text("Edit"), [data-testid="edit-button"]';
  private readonly deleteButton: string = 'button:has-text("Delete"), [data-testid="delete-button"]';
  private readonly saveButton: string = 'button:has-text("Save"), [data-testid="save-button"]';
  private readonly cancelButton: string = 'button:has-text("Cancel"), [data-testid="cancel-button"]';
  
  // Notification/Toast selectors
  private readonly notification: string = '.notification, .toast, .alert, [role="alert"]';
  private readonly successMessage: string = '.success, .alert-success, [data-testid="success-message"]';
  private readonly errorMessage: string = '.error, .alert-error, [data-testid="error-message"]';
  
  // Loading indicators
  private readonly loader: string = '.loader, .spinner, .loading, [data-testid="loader"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to dashboard page
   */
  async navigateToDashboard(dashboardUrl: string = process.env.DASHBOARD_URL || '/dashboard') {
    await this.goto(dashboardUrl);
    await this.waitForDashboardLoad();
  }

  /**
   * Wait for dashboard to fully load
   */
  async waitForDashboardLoad() {
    // Wait for network to be idle
    await this.waitForPageLoad();
    
    // Wait for loader to disappear if present
    const loaderVisible = await this.isVisible(this.loader).catch(() => false);
    if (loaderVisible) {
      await this.page.waitForSelector(this.loader, { state: 'hidden', timeout: 30000 }).catch(() => {});
    }
  }

  /**
   * Get dashboard title
   */
  async getDashboardTitle(): Promise<string | null> {
    return await this.getText(this.dashboardTitle);
  }

  /**
   * Check if user menu is visible
   */
  async isUserMenuVisible(): Promise<boolean> {
    return await this.isVisible(this.userMenu);
  }

  /**
   * Open user menu
   */
  async openUserMenu() {
    await this.click(this.userMenu);
  }

  /**
   * Click logout button
   */
  async logout() {
    await this.openUserMenu();
    await this.click(this.logoutButton);
  }

  /**
   * Get all menu items
   */
  getMenuItems(): Locator {
    return this.getElement(this.menuItems);
  }

  /**
   * Click on a specific menu item by text
   */
  async clickMenuItemByText(text: string) {
    await this.page.click(`${this.menuItems}:has-text("${text}")`);
  }

  /**
   * Get count of stats cards on dashboard
   */
  async getStatsCardsCount(): Promise<number> {
    return await this.getElement(this.statsCards).count();
  }

  /**
   * Get all stats cards
   */
  getStatsCards(): Locator {
    return this.getElement(this.statsCards);
  }

  /**
   * Check if data table is visible
   */
  async isDataTableVisible(): Promise<boolean> {
    return await this.isVisible(this.dataTable);
  }

  /**
   * Get data table
   */
  getDataTable(): Locator {
    return this.getElement(this.dataTable);
  }

  /**
   * Search for data
   */
  async search(query: string) {
    await this.fill(this.searchInput, query);
    // Wait a bit for search to process
    await this.page.waitForTimeout(500);
  }

  /**
   * Click filter button
   */
  async clickFilter() {
    await this.click(this.filterButton);
  }

  /**
   * Click add/create button
   */
  async clickAddButton() {
    await this.click(this.addButton);
  }

  /**
   * Click edit button
   */
  async clickEditButton() {
    await this.click(this.editButton);
  }

  /**
   * Click delete button
   */
  async clickDeleteButton() {
    await this.click(this.deleteButton);
  }

  /**
   * Click save button
   */
  async clickSaveButton() {
    await this.click(this.saveButton);
  }

  /**
   * Click cancel button
   */
  async clickCancelButton() {
    await this.click(this.cancelButton);
  }

  /**
   * Check if success message is visible
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

  /**
   * Check if error message is visible
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
   * Check if notification is visible
   */
  async isNotificationVisible(): Promise<boolean> {
    return await this.isVisible(this.notification);
  }

  /**
   * Get notification text
   */
  async getNotificationText(): Promise<string | null> {
    return await this.getText(this.notification);
  }

  /**
   * Wait for notification to appear
   */
  async waitForNotification(timeout: number = 5000) {
    await this.waitForElement(this.notification, timeout);
  }

  /**
   * Check if specific element exists on dashboard
   */
  async hasElement(selector: string): Promise<boolean> {
    return await this.page.locator(selector).count() > 0;
  }

  /**
   * Get table row count
   */
  async getTableRowCount(): Promise<number> {
    return await this.page.locator(`${this.dataTable} tbody tr`).count();
  }

  /**
   * Check if loader is visible
   */
  async isLoaderVisible(): Promise<boolean> {
    return await this.isVisible(this.loader);
  }

  /**
   * Wait for loader to disappear
   */
  async waitForLoaderToDisappear(timeout: number = 30000) {
    const loaderVisible = await this.isVisible(this.loader).catch(() => false);
    if (loaderVisible) {
      await this.page.waitForSelector(this.loader, { state: 'hidden', timeout }).catch(() => {});
    }
  }
}
