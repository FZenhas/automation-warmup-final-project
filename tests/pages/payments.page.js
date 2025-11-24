import { expect, test } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    /** Locators **/
    this.page = page;
    this.paymentButton = page.getByTestId("payment-confirm-button");
    this.root = page.getByTestId("payment-page");
    this.paymentMethodSection = page.getByTestId("payment-methods-section");
    this.paymentRadioButton = (value) =>
      page.getByRole("radio", { name: value, exact: true });
    this.paymentTotalValue = this.page.getByTestId("payment-total-value");
  }

  /** Dynamic Locators **/
  productName(productIndex) {
    return this.page.getByTestId(`payment-item-name-${productIndex}`);
  }
  productQuantity(productIndex) {
    return this.page.getByTestId(`payment-item-quantity-${productIndex}`);
  }
  productPrice(productIndex) {
    return this.page.getByTestId(`payment-item-price-value-${productIndex}`);
  }
  productPriceTotal(productIndex) {
    return this.page.getByTestId(`payment-item-total-value-${productIndex}`);
  }

  /**
   * Validates the alert displayed when attempting to complete a payment
   * without selecting a payment method. The dialog is dismissed and the
   * page root is expected to remain visible.
   **/
  async validateEmptyPayment() {
    await test.step("Validate Empty Payment Alert", async () => {
      this.page.on("dialog", (dialog) => dialog.dismiss());
      await this.paymentButton.click();
    });
    await expect(this.root).toBeVisible();
  }

  /** Validates the payment summary section for a specific product **/
  async validatePaymentSummary(productIndex, productName) {
    await test.step("Product: " + productName, async () => {
      await expect(this.productName(productIndex)).toBeVisible();
      await expect(this.productQuantity(productIndex)).toBeVisible();
      await expect(this.productPrice(productIndex)).toBeVisible();
      await expect(this.productPriceTotal(productIndex)).toBeVisible();
    });
  }

  /** Verifies that the total payment amount is displayed in the summary section. **/
  async verifyTotalPayment() {
    await test.step("Verify Total Payment", async () => {
      await expect(this.paymentTotalValue).toBeVisible();
    });
  }

  /** Validates the visibility of the payment method section. **/
  async validatePaymentMethodSection() {
    await test.step("Payment Method Section", async () => {
      await expect(this.paymentMethodSection).toBeVisible();
    });
  }

  /** Selects a payment method (PayPal) and confirms the payment. **/
  async confirmPayment() {
    await test.step("Choose payment method and confirm", async () => {
      await this.paymentRadioButton("PayPal").check();
      await this.paymentButton.click();
    });
  }
}
