import { test, expect } from '@playwright/test';

/**
 * Example test suite demonstrating basic Playwright functionality
 */
test.describe('Example Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the test page before each test
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Example/);
  });

  test('should navigate successfully', async ({ page }) => {
    // Check that navigation was successful
    expect(page.url()).toContain('example.com');
  });

  test('should have visible heading', async ({ page }) => {
    // Find and verify heading is visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should interact with page elements', async ({ page }) => {
    // Example of clicking a link
    const links = page.locator('a');
    const linkCount = await links.count();
    
    // Verify there are some links on the page
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should take screenshot on test', async ({ page }) => {
    // Take a screenshot (useful for visual regression testing)
    await page.screenshot({ path: 'test-results/example-page.png' });
    
    // Verify page loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle multiple viewports', async ({ page }) => {
    // Test responsive design by changing viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify page is still functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should verify page metadata', async ({ page }) => {
    // Get page title
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // Check URL
    const url = page.url();
    expect(url).toContain('http');
  });
});

/**
 * Example of testing forms
 */
test.describe('Form Interaction Examples', () => {
  
  test('should demonstrate form filling', async ({ page }) => {
    await page.goto('/');
    
    // Example: If there's a search input
    const searchInput = page.locator('input[type="text"]').first();
    
    // Check if input exists before interacting
    const inputCount = await page.locator('input[type="text"]').count();
    if (inputCount > 0) {
      await searchInput.fill('test query');
      const value = await searchInput.inputValue();
      expect(value).toBe('test query');
    }
  });

  test('should demonstrate button clicking', async ({ page }) => {
    await page.goto('/');
    
    // Example: Finding and clicking buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    // Verify buttons exist
    expect(buttonCount).toBeGreaterThanOrEqual(0);
  });
});

/**
 * Example of API testing with Playwright
 */
test.describe('API Testing Example', () => {
  
  test('should make API request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Verify response status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    // Verify response body
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
  });
});
