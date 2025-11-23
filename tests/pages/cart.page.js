import { expect, test } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  productName(productIndex) {
    return this.page.getByTestId(`cart-item-name-${productIndex}`);
  }

  productQuantity(productIndex) {
    return this.page.getByTestId(`cart-item-quantity-${productIndex}`);
  }

  productPrice(productIndex) {
    return this.page.getByTestId(`cart-item-price-value-${productIndex}`);
  }

  async verifyProduct(productIndex, productName) {
    await test.step("Product: " + productName, async () => {
      await expect(this.productName(productIndex)).toBeVisible();
      await expect(this.productQuantity(productIndex)).toBeVisible();
      await expect(this.productPrice(productIndex)).toBeVisible();
    });
  }
}
