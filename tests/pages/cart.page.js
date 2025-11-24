import { expect, test } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTotalValue = page.getByTestId("cart-total-value");
  }

  /** Dynamic locators **/ 

  productName(productIndex) {
    return this.page.getByTestId(`cart-item-name-${productIndex}`);
  }

  productQuantity(productIndex) {
    return this.page.getByTestId(`cart-item-quantity-${productIndex}`);
  }

  productPrice(productIndex) {
    return this.page.getByTestId(`cart-item-price-value-${productIndex}`);
  }

  productPriceTotal(productIndex) {
    return this.page.getByTestId(`cart-item-total-value-${productIndex}`);
  }


  /** Methods **/

  async verifyProductName(productIndex, productName) {
    await test.step("Verify Product Name: " + productName, async () => {
      await expect(this.productName(productIndex)).toBeVisible();
    });
  }

  async verifyProductPrice(productIndex, productPrice) {
    await test.step("Verify Product Price: " + productPrice + "€", async () => {
      await expect(this.productPrice(productIndex)).toBeVisible();
    });
  }
  
  async verifyProductQuantity(productIndex, productQuantity) {
    await test.step(
      "Verify Product Quantity: " + productQuantity + "€",
      async () => {
        await expect(this.productQuantity(productIndex)).toBeVisible();
      }
    );
  }
  
  async verifyProductTotal(productIndex, productPriceTotal) {
    await test.step(
      "Verify Product Total: " + productPriceTotal + "€",
      async () => {
        await expect(this.productPriceTotal(productIndex)).toBeVisible();
      }
    );
  }

  async verifyCartTotal() {
    await test.step("Verify Cart Total", async () => {
      await expect(this.cartTotalValue).toBeVisible();
    });
  }
}
