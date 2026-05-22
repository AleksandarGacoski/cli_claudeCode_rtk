import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly searchInput = this.page.locator('#filter_keyword');
  readonly featuredProducts = this.page.locator('div.block_frame_featured .col-md-3');

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/');
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }
}
