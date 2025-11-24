import { expect, test } from "@playwright/test";


export class StorePage {
  constructor(page) {
    this.page = page;
   

    //** Fixed Locators Store landing Page **/
    this.tabHome = page.getByRole("button", { name: "Home" });
    this.tabInventory = page.getByRole("button", { name: "Inventory" });
    this.tabCatalog = page.getByRole("button", { name: "Catalog" });
    this.tabCart = page.getByTestId("store-tab-cart"); 
    this.tabPayments = page.getByTestId("store-tab-payments");
    this.tabOrders = page.getByRole("button", { name: "Orders" });

    this.storeHomePage = page.getByTestId("store-page");
    this.inventoryPage = page.getByTestId("inventory-page");
    this.catalogPage = page.getByTestId("catalog-page");
    this.cartPage = page.getByTestId("cart-page");
    this.paymentsPage = page.getByTestId("payment-page");
    this.ordersPage = page.getByTestId("orders-page");
  }

  //**Locators Inventory Tab **/

  async navigateToStore() {
    await test.step("Navigate to store page", async () => {
      await this.page.goto("/store");
      await expect(this.storeHomePage).toBeVisible();
    });
  }

  async goToInventory() {
    await test.step("Navigate to Inventory Page", async () => {
      // Clica na aba Inventory
      await this.tabInventory.click();
      await expect(this.inventoryPage).toBeVisible();
    });
  }

  async goToCatalog() {
    await test.step("Navigate to Catalog Page", async () => {
      // Clica na aba Inventory
      await this.tabCatalog.click();
      await expect(this.catalogPage).toBeVisible();
    });
  }

  async goToCart() {
    await test.step("Navigate to Cart Page", async () => {
      // Clica na aba Inventory
      await this.tabCart.click();
      await expect(this.cartPage).toBeVisible();
    });
  }

  async goToPayments() {
    await test.step("Navigate to Payments Page", async () => {
      // Clica na aba Inventory
      await this.tabPayments.click();
      await expect(this.paymentsPage).toBeVisible();
    });
  }

  async goToOrders() {
    await test.step("Navigate to Orders Page", async () => {
      // Clica na aba Inventory
      await this.tabOrders.click();
      await expect(this.ordersPage).toBeVisible();
    });
  }

  
}
