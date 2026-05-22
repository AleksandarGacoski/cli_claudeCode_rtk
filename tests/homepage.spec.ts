import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Homepage', () => {
  test('displays featured products on load', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(home.featuredProducts.first()).toBeVisible();
  });

  test('search returns results for a known product', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.search('absolute');
    // Multiple results → search results grid or single redirect
    await expect(page.locator('div.col-md-3').first()).toBeVisible();
  });

  test('search with no match shows no results message', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.search('xyznotexist99999');
    await expect(
      page.getByText('There is no product that matches the search criteria.')
    ).toBeVisible();
  });
});
