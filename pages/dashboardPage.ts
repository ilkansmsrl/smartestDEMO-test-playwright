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
}
