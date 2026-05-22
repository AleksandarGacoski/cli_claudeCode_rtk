import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

// product_id=55 (LE ROUGE ABSOLU) requires the detail page — it has colour options
// so .productcart does not skip straight to cart
const PRODUCT_WITH_OPTIONS = 55;

test.describe('Cart', () => {
  test('empty cart shows empty message', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goto();
    await expect(cart.emptyMessage).toBeVisible();
  });

  test('add product from detail page adds item to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cart = new CartPage(page);

    await productPage.gotoProductDetail(PRODUCT_WITH_OPTIONS);
    await productPage.addToCart();

    await cart.goto();
    expect(await cart.getRowCount()).toBeGreaterThan(0);
  });

  test('cart shows grand total after adding product', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cart = new CartPage(page);

    await productPage.gotoProductDetail(PRODUCT_WITH_OPTIONS);
    await productPage.addToCart();

    await cart.goto();
    const total = await cart.getGrandTotal();
    expect(total).toMatch(/\$[\d,]+\.\d{2}/);
  });

  test('cart header reflects item count after adding product', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.gotoProductDetail(PRODUCT_WITH_OPTIONS);
    await productPage.addToCart();

    await expect(page.locator('.cart_total').first()).not.toHaveText('$0.00');
  });
});
