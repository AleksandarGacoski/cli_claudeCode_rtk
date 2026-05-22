import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const guestDetails = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  telephone: '1234567890',
  address: '123 Test Street',
  city: 'Test City',
  postcode: 'SW1A 1AA',
  country: 'United Kingdom',
};

test.describe('E2E Order', () => {
  test('guest can place an order end-to-end', async ({ page }) => {
    const productPage = new ProductPage(page);
    const checkout = new CheckoutPage(page);

    // 1. Add a known product to cart via its detail page
    // LE ROUGE ABSOLU (product_id=55) requires the detail page — no direct-add shortcut
    await page.goto('/index.php?rt=product/product&product_id=55', { waitUntil: 'domcontentloaded' });
    await productPage.addToCart();

    // 2. Start checkout — redirects to account/login page
    await checkout.startCheckout();

    // 3. Choose guest checkout
    await checkout.selectGuestCheckout();
    await expect(page).toHaveURL(/guest_step_1/);

    // 4. Fill personal and billing details
    await checkout.fillGuestDetails(guestDetails);
    await checkout.submitGuestDetails();

    // 5. Confirm order on step 3
    await expect(page).toHaveURL(/guest_step_3/);
    await checkout.confirmOrder();

    // 6. Verify success
    await expect(page).toHaveURL(/checkout\/success/);
    await expect(checkout.successHeading).toBeVisible();
  });
});
