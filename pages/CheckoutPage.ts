import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export class CheckoutPage extends BasePage {
  readonly guestCheckoutRadio = this.page.locator('#accountFrm_accountguest');
  readonly continueButton = this.page.getByRole('button', { name: /continue/i }).first();
  readonly confirmOrderButton = this.page.locator('#checkout_btn');
  readonly successHeading = this.page.getByText(/your order has been successfully processed/i);

  constructor(page: Page) {
    super(page);
  }

  async startCheckout() {
    await this.navigate('/index.php?rt=checkout/shipping');
  }

  async selectGuestCheckout() {
    await this.guestCheckoutRadio.check();
    await this.continueButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillGuestDetails(details: GuestDetails) {
    await this.page.fill('#guestFrm_firstname', details.firstName);
    await this.page.fill('#guestFrm_lastname', details.lastName);
    await this.page.fill('#guestFrm_email', details.email);
    await this.page.fill('#guestFrm_telephone', details.telephone);
    await this.page.fill('#guestFrm_address_1', details.address);
    await this.page.fill('#guestFrm_city', details.city);
    await this.page.fill('#guestFrm_postcode', details.postcode);
    await this.page.selectOption('#guestFrm_country_id', { label: details.country });
    // Wait for zone dropdown to populate via AJAX, then pick first option
    await this.page.waitForTimeout(600);
    const zoneCount = await this.page.locator('#guestFrm_zone_id option').count();
    if (zoneCount > 1) {
      await this.page.selectOption('#guestFrm_zone_id', { index: 1 });
    }
  }

  async submitGuestDetails() {
    await this.continueButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async confirmOrder() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.confirmOrderButton.click(),
    ]);
  }

  async isOrderSuccessful(): Promise<boolean> {
    return this.page.url().includes('rt=checkout/success');
  }
}
