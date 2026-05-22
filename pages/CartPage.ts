import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Grand total value (the price span, not the "Total:" label)
  readonly grandTotal = this.page.locator('span.bold.totalamout').filter({ hasText: /\$/ });
  // Product rows in cart table (tbody rows, first row is header)
  readonly cartRows = this.page.locator('table.table-striped tbody tr').filter({ hasNot: this.page.locator('th') });
  readonly emptyMessage = this.page.getByText(/your shopping cart is empty/i);

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/index.php?rt=checkout/cart');
  }

  async getGrandTotal(): Promise<string> {
    return this.grandTotal.innerText();
  }

  async getRowCount(): Promise<number> {
    return this.cartRows.count();
  }

  async isEmpty(): Promise<boolean> {
    return this.emptyMessage.isVisible();
  }
}
