import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('#loginFrm_loginname');
  readonly passwordInput = this.page.locator('#loginFrm_password');
  readonly loginButton = this.page.getByRole('button', { name: /login/i });
  readonly logoutLink = this.page.getByRole('link', { name: /logout/i });

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/index.php?rt=account/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('rt=account/account');
  }
}
