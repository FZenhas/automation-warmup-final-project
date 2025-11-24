import { expect, test } from "@playwright/test";

export class CatalogPage {
  constructor(page) {
    this.page = page;
  }

  // ======== ASSERT CUSTOMIZADA ========
  async expectProductOutOfStock(productIndex) {
    const addToCartButton = this.page.getByTestId(
      `catalog-item-add-button-${productIndex}`
    );

    await expect(addToCartButton).toBeDisabled();
    await expect(addToCartButton).toHaveText("Out of Stock");
  }

  // ======== MÉTODO PRINCIPAL COM LOOP ========
  async addProducttoCart({ productName, productIndex, clickCount }) {
    await test.step(`Add product "${productName}" to Cart`, async () => {
      const addToCartButton = this.page.getByTestId(
        `catalog-item-add-button-${productIndex}`
      );

      const productItemQuantity = this.page.getByTestId(
        `catalog-item-quantity-${productIndex}`
      );

      for (let i = 0; i < clickCount; i++) {
        // Se o botão já estiver desabilitado durante o loop
        if (await addToCartButton.isDisabled()) {
          await this.expectProductOutOfStock(productIndex);
          return;
        }

        await addToCartButton.click();
        await expect(productItemQuantity).toBeVisible();
      }

      // Após terminar o loop, validar se ficou sem estoque
      if (await addToCartButton.isDisabled()) {
        await this.expectProductOutOfStock(productIndex);
      }
    });
  }
  
}
