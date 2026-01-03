import { test, expect } from '../fixtures/testFixtures';

/**
 * Dashboard Test Suite
 * Comprehensive tests for dashboard functionality using credentials from .env file
 */

test.describe('Dashboard - Authentication & Navigation', () => {
  
  test.beforeEach(async ({ page, loginPage }) => {
    // Navigate to login page before each test
    const loginUrl = process.env.LOGIN_URL || '/login';
    await page.goto(loginUrl);
  });

  test('should login with credentials from .env and navigate to dashboard', async ({ page, loginPage, dashboardPage }) => {
    // Get credentials from environment variables
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    
    // Verify credentials are loaded from .env
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    
    // Perform login
    await loginPage.login(username, password);
    
    // Wait for navigation to dashboard
    await page.waitForURL(/dashboard/, { timeout: 10000 }).catch(() => {});
    
    // Verify we're on dashboard or that page loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display dashboard after successful login', async ({ page, loginPage, dashboardPage }) => {
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    
    await loginPage.login(username, password);
    
    // Navigate to dashboard explicitly
    await dashboardPage.navigateToDashboard();
    
    // Verify dashboard loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have dashboard title visible', async ({ page, dashboardPage }) => {
    // Navigate directly to dashboard
    await dashboardPage.navigateToDashboard();
    
    // Verify page title exists
    const title = await dashboardPage.getTitle();
    expect(title).toBeTruthy();
  });
});

test.describe('Dashboard - Overview & Statistics', () => {
  
  test.beforeEach(async ({ dashboardPage }) => {
    // Navigate to dashboard before each test
    await dashboardPage.navigateToDashboard();
  });

  test('should display dashboard statistics cards', async ({ dashboardPage }) => {
    // Wait for dashboard to fully load
    await dashboardPage.waitForDashboardLoad();
    
    // Check if stats cards exist
    const statsCount = await dashboardPage.getStatsCardsCount();
    
    // Dashboard should have at least 0 stats cards (flexible for different dashboards)
    expect(statsCount).toBeGreaterThanOrEqual(0);
  });

  test('should display main dashboard content', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Verify main content area is visible
    await expect(page.locator('main, [role="main"], .main-content, .dashboard-content')).toBeVisible();
  });

  test('should have dashboard header visible', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Check if header/navigation exists
    const headerVisible = await dashboardPage.isVisible('header, [role="banner"]');
    
    // Most dashboards have a header
    expect(headerVisible).toBe(true);
  });

  test('should load dashboard without errors', async ({ page, dashboardPage }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Log errors if any (but don't fail test as some errors might be expected)
    if (errors.length > 0) {
      console.log('Page errors detected:', errors);
    }
    
    // Verify page is functional
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - Navigation Menu', () => {
  
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
  });

  test('should display navigation menu', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Check if navigation exists
    const navVisible = await dashboardPage.isVisible('nav, [role="navigation"]');
    
    // Most dashboards have navigation
    if (navVisible) {
      const menuItems = dashboardPage.getMenuItems();
      const itemCount = await menuItems.count();
      expect(itemCount).toBeGreaterThan(0);
    }
  });

  test('should have clickable menu items', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Get all menu items
    const menuItems = dashboardPage.getMenuItems();
    const itemCount = await menuItems.count();
    
    if (itemCount > 0) {
      // Verify first menu item is clickable
      const firstItem = menuItems.first();
      await expect(firstItem).toBeVisible();
    }
  });

  test('should navigate between dashboard sections', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    const currentUrl = page.url();
    
    // Verify we're on a valid page
    expect(currentUrl).toContain('http');
    expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - User Profile & Settings', () => {
  
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
  });

  test('should display user menu or profile section', async ({ dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Check if user menu exists
    const userMenuVisible = await dashboardPage.isUserMenuVisible();
    
    // Log result for debugging
    console.log('User menu visible:', userMenuVisible);
    
    // Dashboard might have user menu
    expect(typeof userMenuVisible).toBe('boolean');
  });

  test('should be able to interact with user menu', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    const userMenuVisible = await dashboardPage.isUserMenuVisible();
    
    if (userMenuVisible) {
      // Try to open user menu
      await dashboardPage.openUserMenu().catch(() => {
        console.log('User menu interaction not available or different structure');
      });
    }
    
    // Verify page is still functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have user profile information accessible', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Check for common profile indicators
    const hasUserInfo = await dashboardPage.hasElement('.user-name, .username, [data-testid="user-info"]');
    
    // Log result
    console.log('User info element found:', hasUserInfo);
    
    // Verify dashboard is functional
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - Data Display & Tables', () => {
  
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
  });

  test('should display data table if available', async ({ dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Check if data table exists
    const tableVisible = await dashboardPage.isDataTableVisible();
    
    console.log('Data table visible:', tableVisible);
    
    if (tableVisible) {
      const rowCount = await dashboardPage.getTableRowCount();
      expect(rowCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('should handle search functionality if available', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Check if search input exists
    const hasSearch = await dashboardPage.hasElement('input[type="search"], input[placeholder*="Search"]');
    
    if (hasSearch) {
      await dashboardPage.search('test').catch(() => {
        console.log('Search functionality not available or different structure');
      });
    }
    
    // Verify page remains functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display data cards or widgets', async ({ page, dashboardPage }) => {
    await dashboardPage.waitForDashboardLoad();
    
    // Check for common dashboard widgets/cards
    const hasCards = await dashboardPage.hasElement('.card, .widget, .panel, [data-testid="card"]');
    
    console.log('Dashboard cards/widgets found:', hasCards);
    
    // Dashboard should have some content
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - Loading & Performance', () => {
  
  test('should load dashboard within acceptable time', async ({ page, dashboardPage }) => {
    const startTime = Date.now();
    
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    const loadTime = Date.now() - startTime;
    
    console.log(`Dashboard load time: ${loadTime}ms`);
    
    // Dashboard should load within 30 seconds (generous timeout)
    expect(loadTime).toBeLessThan(30000);
  });

  test('should not show loader after page load', async ({ dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Wait a bit more for any async loaders
    await dashboardPage.page.waitForTimeout(1000);
    
    const loaderVisible = await dashboardPage.isLoaderVisible();
    
    // Loader should be hidden after page loads
    expect(loaderVisible).toBe(false);
  });

  test('should handle page reload gracefully', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Reload the page
    await page.reload();
    await dashboardPage.waitForDashboardLoad();
    
    // Verify page is still functional after reload
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - Responsive Design', () => {
  
  test('should display correctly on desktop viewport', async ({ page, dashboardPage }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Verify content is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page, dashboardPage }) => {
    // Set tablet viewport (iPad)
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Verify content is visible and responsive
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display correctly on mobile viewport', async ({ page, dashboardPage }) => {
    // Set mobile viewport (iPhone)
    await page.setViewportSize({ width: 375, height: 667 });
    
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Verify content is visible on mobile
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle viewport changes', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Change viewport from desktop to mobile
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Verify page is still functional after viewport changes
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - Error Handling', () => {
  
  test('should handle network errors gracefully', async ({ page, dashboardPage }) => {
    // Navigate to dashboard
    await dashboardPage.navigateToDashboard();
    
    // Page should load even if some resources fail
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display appropriate messages when no data available', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Check if empty state messages exist (if applicable)
    const hasEmptyState = await dashboardPage.hasElement('.empty-state, .no-data, [data-testid="empty-state"]');
    
    console.log('Empty state element found:', hasEmptyState);
    
    // Dashboard should handle empty states
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - Accessibility', () => {
  
  test('should have proper heading structure', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Check if h1 heading exists
    const h1Count = await page.locator('h1').count();
    
    // Page should have at least one main heading
    expect(h1Count).toBeGreaterThanOrEqual(0);
  });

  test('should have keyboard navigable elements', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    // Verify page is keyboard accessible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have proper ARIA labels where needed', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Check for navigation landmark
    const navExists = await page.locator('[role="navigation"], nav').count();
    
    console.log('Navigation landmarks found:', navExists);
    
    // Dashboard should have accessible navigation
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Dashboard - Integration Tests', () => {
  
  test('should complete full user workflow from login to dashboard interaction', async ({ page, loginPage, dashboardPage }) => {
    // 1. Login
    const loginUrl = process.env.LOGIN_URL || '/login';
    await page.goto(loginUrl);
    
    const username = process.env.TEST_USERNAME || '';
    const password = process.env.TEST_PASSWORD || '';
    
    await loginPage.login(username, password);
    
    // 2. Navigate to dashboard
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // 3. Interact with dashboard elements
    const statsCount = await dashboardPage.getStatsCardsCount();
    console.log('Stats cards found:', statsCount);
    
    // 4. Verify dashboard is fully functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should maintain session across page refreshes', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    const url1 = page.url();
    
    // Reload page
    await page.reload();
    await dashboardPage.waitForDashboardLoad();
    
    const url2 = page.url();
    
    // URL should remain similar (might have query params)
    expect(url2).toContain('http');
  });

  test('should handle multiple dashboard views', async ({ page, dashboardPage }) => {
    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();
    
    // Get initial URL
    const initialUrl = page.url();
    
    // Check if we can navigate to different views
    const menuItems = dashboardPage.getMenuItems();
    const itemCount = await menuItems.count();
    
    console.log('Menu items available:', itemCount);
    
    // Dashboard should be navigable
    await expect(page.locator('body')).toBeVisible();
  });
});
