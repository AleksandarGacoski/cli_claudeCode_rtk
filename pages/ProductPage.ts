import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Category listing
  readonly productItems = this.page.locator('div.col-md-3.col-sm-6.col-xs-12');
  // .productcart links to product detail page
  readonly productCartLinks = this.page.locator('a.productcart');
  // Product name link (also navigates to detail)
  readonly productNameLinks = this.page.locator('a.prdocutname');
  // Add to cart button on detail page
  readonly addToCartButton = this.page.locator('a.cart').filter({ hasText: /add to cart/i });

  constructor(page: Page) {
    super(page);
  }

  async gotoCategory(path: string) {
    await this.navigate(`/index.php?rt=product/category&path=${path}`);
  }

  async gotoProductDetail(productId: number) {
    await this.navigate(`/index.php?rt=product/product&product_id=${productId}`);
  }

  async gotoSpecials() {
    await this.navigate('/index.php?rt=product/special');
  }

  async clickFirstProductLink() {
    await this.productCartLinks.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
