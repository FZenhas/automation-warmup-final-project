import { expect, test } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.paymentButton = page.getByTestId("payment-confirm-button");
    this.root = page.getByTestId("payment-page");
    this.paymentMethodSection = page.getByTestId("payment-methods-section");
    this.paymentRadioButton = (value) =>
      page.getByRole("radio", { name: value, exact: true });
    this. paymentTotalValue = this.page.getByTestId("payment-total-value");
  }

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
 

  async validateEmptyPayment() {
    await test.step("Validate empty payment alert", async () => {
      this.page.on("dialog", (dialog) => dialog.dismiss());
      await this.paymentButton.click();
    });
    await expect(this.root).toBeVisible();
  }

async validatePaymentSummary(productIndex,productName) {
   await test.step("Product: " + productName, async () => {
     await expect(this.productName(productIndex)).toBeVisible();
     await expect(this.productQuantity(productIndex)).toBeVisible();
     await expect(this.productPrice(productIndex)).toBeVisible();
     await expect(this.productPriceTotal(productIndex)).toBeVisible();
   });
 }

 async verifyTotalPayment() {
    await test.step("Verify Total Payment", async () => {
      await expect(this.paymentTotalValue).toBeVisible();
    });
  }

  async validatePaymentMethodSection() {
    await test.step("Payment Method Section", async () => {
      await expect(this.paymentMethodSection).toBeVisible();
    });
  }
  

  async confirmPayment() {
    await test.step("Choose payment method and confirm", async () => {
      await this.paymentRadioButton("PayPal").check();
      await this.paymentButton.click();
    });
  }
}
