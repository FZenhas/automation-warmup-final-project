import { expect, test } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    //** Fixed Locators Store landing Page **/
    this.inventoryHeader = page.getByRole("heading", {
      name: "Inventory Management",
    });
    this.productNameInput = page.getByTestId("inventory-input-name");
    this.productPriceInput = page.getByTestId("inventory-input-price");
    this.productQuantityInput = page.getByTestId("inventory-input-quantity");
  }

  //**Locators Inventory Tab **/

  async assertOnInventoryPage() {
    await expect(this.inventoryHeader).toBeVisible();
  }

  async addAndVerifyProduct({ productName, productPrice, productQuantity }) {
    await test.step(`Add and verify product "${productName}"`, async () => {
      // Preenche nome
      await this.page.getByTestId("inventory-input-name").click();
      await this.page.getByTestId("inventory-input-name").fill(productName);
      await expect(this.productNameInput).toBeVisible();

      // Preenche preço
      await this.page.getByTestId("inventory-input-price").click();
      await this.page.getByTestId("inventory-input-price").fill(productPrice);
      await expect(this.productPriceInput).toBeVisible();

      // Preenche quantidade
      await this.page.getByTestId("inventory-input-quantity").click();
      await this.page
        .getByTestId("inventory-input-quantity")
        .fill(productQuantity);
      await expect(this.productQuantityInput).toBeVisible();

      // Submete produto
      await this.page.getByTestId("inventory-submit-button").click();

      // Verifica se produto está visível
      const productLocator = this.page.getByText(productName, { exact: true });
      await expect(productLocator).toBeVisible();
    });
  }

  async increaseProductQuantity(productIndex, productName, times = 3) {
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
