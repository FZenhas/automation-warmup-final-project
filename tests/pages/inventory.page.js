import { expect, test } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    //** Fixed Locators **/
    this.productNameInput = page.getByTestId("inventory-input-name");
    this.productPriceInput = page.getByTestId("inventory-input-price");
    this.productQuantityInput = page.getByTestId("inventory-input-quantity");
  }

  //** Method of add the product to the cart and verify the elements **/

  async addAndVerifyProduct({ productName, productPrice, productQuantity }) {
    await test.step(`Add and verify product "${productName}"`, async () => {
      await test.step("Fill Product Name", async () => {
        await this.page.getByTestId("inventory-input-name").click();
        await this.page.getByTestId("inventory-input-name").fill(productName);
        await expect(this.productNameInput).toBeVisible();
      });

      await test.step("Fill Product Price", async () => {
        await this.page.getByTestId("inventory-input-price").click();
        await this.page.getByTestId("inventory-input-price").fill(productPrice);
        await expect(this.productPriceInput).toBeVisible();
      });

      await test.step("Fill Product Quantity", async () => {
        await this.page.getByTestId("inventory-input-quantity").click();
        await this.page
          .getByTestId("inventory-input-quantity")
          .fill(productQuantity);
        await expect(this.productQuantityInput).toBeVisible();
      });

      await test.step("Add Product to Inventory", async () => {
        await this.page.getByTestId("inventory-submit-button").click();
      });

      await test.step("Product added to the bottom of the list", async () => {
        const productLocator = this.page.getByText(productName, {
          exact: true,
        });
        await expect(productLocator).toBeVisible();
      });
    });
  }

  //** Method to Increase Product Quantity **/

  async increaseProductQuantity(productIndex, productName, times = 8) {
    const increaseButton = this.page.getByTestId(
      `inventory-product-increase-${productIndex}`
    );
    const productQuantityField = this.page.getByTestId(
      `inventory-product-quantity-${productIndex}`
    );

    await test.step(`Increase product "${productName}" quantity`, async () => {
      for (let i = 0; i < times; i++) {
        await increaseButton.click();
        await expect(productQuantityField).toHaveText((i + 3).toString());
      }
    });
  }

  //** Method to Decrease Product Quantity **/

  async decreaseProductQuantity(productIndex, productName, times = 5) {
    const decreaseButton = this.page.getByTestId(
      `inventory-product-decrease-${productIndex}`
    );
    const productQuantityField = this.page.getByTestId(
      `inventory-product-quantity-${productIndex}`
    );

    await test.step(`Decrease product "${productName}" quantity`, async () => {
      for (let i = 0; i < times; i++) {
        await decreaseButton.click();
        await expect(productQuantityField).toBeVisible();
      }
    });
  }
}
