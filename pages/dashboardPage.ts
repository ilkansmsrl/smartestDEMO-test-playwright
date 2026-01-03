import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Dashboard Page Object Model
 * Contains all elements and actions for the dashboard page
 */
export class DashboardPage extends BasePage {
  // Selectors for dashboard elements as per requirements
  private readonly welcomeText: string = '.welcome-text';
  private readonly statCard: string = '.stat-card';
  private readonly sidebarMenu: string = '#sidebar-menu';
  private readonly logoutButton: string = '#logout-btn';
  
  // Additional common dashboard elements
  private readonly dashboardHeader: string = 'header, [role="banner"]';
  
  // Navigation menu selectors
  private readonly mainMenu: string = 'nav, [role="navigation"]';
  private readonly menuItems: string = 'nav a, [role="navigation"] a';

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
  }

  /**
   * Get welcome message text
   */
  async getWelcomeText(): Promise<string | null> {
    return await this.getText(this.welcomeText);
  }

  /**
   * Check if welcome text is visible
   */
  async isWelcomeTextVisible(): Promise<boolean> {
    return await this.isVisible(this.welcomeText);
  }

  /**
   * Get count of stats cards on dashboard
   */
  async getStatsCardsCount(): Promise<number> {
    return await this.getElement(this.statCard).count();
  }

  /**
   * Get all stats cards
   */
  getStatsCards(): Locator {
    return this.getElement(this.statCard);
  }

  /**
   * Check if sidebar menu is visible
   */
  async isSidebarMenuVisible(): Promise<boolean> {
    return await this.isVisible(this.sidebarMenu);
  }

  /**
   * Get sidebar menu element
   */
  getSidebarMenu(): Locator {
    return this.getElement(this.sidebarMenu);
  }

  /**
   * Click logout button
   */
  async logout() {
    await this.click(this.logoutButton);
  }

  /**
   * Check if logout button is visible
   */
  async isLogoutButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.logoutButton);
  }

  /**
   * Get all menu items (for backward compatibility)
   */
  getMenuItems(): Locator {
    return this.getElement(this.menuItems);
  }

  /**
   * Check if user menu is visible (for backward compatibility)
   * Uses sidebar menu as fallback
   */
  async isUserMenuVisible(): Promise<boolean> {
    return await this.isSidebarMenuVisible();
  }

  /**
   * Open user menu (for backward compatibility)
   * Uses sidebar menu as fallback
   */
  async openUserMenu() {
    // For backward compatibility, do nothing or could click sidebar
  }

  /**
   * Check if data table is visible
   */
  async isDataTableVisible(): Promise<boolean> {
    const dataTable = 'table, .data-table, [data-testid="data-table"]';
    return await this.isVisible(dataTable);
  }

  /**
   * Get table row count
   */
  async getTableRowCount(): Promise<number> {
    const dataTable = 'table, .data-table, [data-testid="data-table"]';
    return await this.page.locator(`${dataTable} tbody tr`).count();
  }

  /**
   * Search for data
   */
  async search(query: string) {
    const searchInput = 'input[type="search"], input[placeholder*="Search"], input[placeholder*="search"]';
    await this.fill(searchInput, query);
    // Wait a bit for search to process
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if specific element exists on dashboard
   */
  async hasElement(selector: string): Promise<boolean> {
    return await this.page.locator(selector).count() > 0;
  }

  /**
   * Check if loader is visible
   */
  async isLoaderVisible(): Promise<boolean> {
    const loader = '.loader, .spinner, .loading, [data-testid="loader"]';
    return await this.isVisible(loader);
  }
}
