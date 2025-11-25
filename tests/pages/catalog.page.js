import { expect, test } from "@playwright/test";

export class CatalogPage {
  constructor(page) {
    this.page = page;
  }

  /** Assertion to verify that the product is out of stock **/
  async expectProductOutOfStock(productIndex) {
    test.step("Product is out of stock", async () => {
      const addToCartButton = this.page.getByTestId(
        `catalog-item-add-button-${productIndex}`
      );

      await expect(addToCartButton).toBeDisabled();
      await expect(addToCartButton).toHaveText("Out of Stock");
    });
  }

  /** Methods **/
  async addProducttoCart({ productName, productIndex, clickCount }) {
    await test.step(`Add product "${productName}" to Cart`, async () => {
      const addToCartButton = this.page.getByTestId(
        `catalog-item-add-button-${productIndex}`
      );

      const productItemQuantity = this.page.getByTestId(
        `catalog-item-quantity-${productIndex}`
      );

      for (let i = 0; i < clickCount; i++) {
        /** If the button turns disabled during the loop, it means the product has run out of stock **/
        if (await addToCartButton.isDisabled()) {
          await this.expectProductOutOfStock(productIndex);
          return;
        }

        await addToCartButton.click();
        await expect(productItemQuantity).toBeVisible();
      }

      /** After finishing the loop, validates that the stock is no longer available **/
      if (await addToCartButton.isDisabled()) {
        await this.expectProductOutOfStock(productIndex);
      }
    });
  }
}
