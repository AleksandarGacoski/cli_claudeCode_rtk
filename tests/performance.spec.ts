import { test, expect } from '@playwright/test';

const THRESHOLDS = {
  ttfb: 5000,        // Time to First Byte (ms)
  domReady: 10000,   // DOM Content Loaded (ms)
  fullLoad: 15000,   // Full page load (ms)
};

async function measurePage(page: any, url: string, label: string) {
  await page.goto(url, { waitUntil: 'load' });

  const timing = await page.evaluate(() => {
    const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    return {
      ttfb: Math.round(nav.responseStart - nav.startTime),
      domReady: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
      fullLoad: Math.round(nav.loadEventEnd - nav.startTime),
    };
  });

  console.log(
    `[${label}] TTFB: ${timing.ttfb}ms | DOM ready: ${timing.domReady}ms | Full load: ${timing.fullLoad}ms`
  );

  return timing;
}

test.describe('Performance', () => {
  test('homepage load time', async ({ page }) => {
    const t = await measurePage(page, '/', 'Homepage');
    expect(t.ttfb, `TTFB > ${THRESHOLDS.ttfb}ms`).toBeLessThan(THRESHOLDS.ttfb);
    expect(t.domReady, `DOM ready > ${THRESHOLDS.domReady}ms`).toBeLessThan(THRESHOLDS.domReady);
    expect(t.fullLoad, `Full load > ${THRESHOLDS.fullLoad}ms`).toBeLessThan(THRESHOLDS.fullLoad);
  });

  test('category page load time', async ({ page }) => {
    const t = await measurePage(page, '/index.php?rt=product/category&path=36_41', 'Lips category');
    expect(t.ttfb).toBeLessThan(THRESHOLDS.ttfb);
    expect(t.domReady).toBeLessThan(THRESHOLDS.domReady);
    expect(t.fullLoad).toBeLessThan(THRESHOLDS.fullLoad);
  });

  test('product detail page load time', async ({ page }) => {
    const t = await measurePage(page, '/index.php?rt=product/product&product_id=55', 'Product detail');
    expect(t.ttfb).toBeLessThan(THRESHOLDS.ttfb);
    expect(t.domReady).toBeLessThan(THRESHOLDS.domReady);
    expect(t.fullLoad).toBeLessThan(THRESHOLDS.fullLoad);
  });

  test('login page load time', async ({ page }) => {
    const t = await measurePage(page, '/index.php?rt=account/login', 'Login');
    expect(t.ttfb).toBeLessThan(THRESHOLDS.ttfb);
    expect(t.domReady).toBeLessThan(THRESHOLDS.domReady);
    expect(t.fullLoad).toBeLessThan(THRESHOLDS.fullLoad);
  });

  test('cart page load time', async ({ page }) => {
    const t = await measurePage(page, '/index.php?rt=checkout/cart', 'Cart');
    expect(t.ttfb).toBeLessThan(THRESHOLDS.ttfb);
    expect(t.domReady).toBeLessThan(THRESHOLDS.domReady);
    expect(t.fullLoad).toBeLessThan(THRESHOLDS.fullLoad);
  });
});
