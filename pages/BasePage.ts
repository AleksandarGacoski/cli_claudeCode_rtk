import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getAlertDanger(): Promise<string> {
    return this.page.locator('.alert-danger').innerText();
  }

  async getAlertSuccess(): Promise<string> {
    return this.page.locator('.alert-success').innerText();
  }

  async alertDangerVisible(): Promise<boolean> {
    return this.page.locator('.alert-danger').isVisible();
  }

  async alertSuccessVisible(): Promise<boolean> {
    return this.page.locator('.alert-success').isVisible();
  }
}
