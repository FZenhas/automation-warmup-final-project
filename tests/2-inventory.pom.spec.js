import { test } from "@playwright/test";
import { StorePage } from "./pages/store.page";
import { InventoryPage } from "./pages/inventory.page";
import { ADD_PRODUCTS, PRODUCTS_QUANTITY } from "./data/inventory.data";

test.describe("Inventory Page", () => {
  
  test("Add New Products to the Inventory and Verify", async ({ page }) => {
    const store = new StorePage(page);
    const inventory = new InventoryPage(page);

    await store.navigateToStore();
    await store.goToInventory();

    for (const prod of ADD_PRODUCTS) {
      await inventory.addAndVerifyProduct(prod);
    }
  });

  test("Increase / Decrease Product Quantities", async ({ page }) => {
    const store = new StorePage(page);
    const inventory = new InventoryPage(page);

    await store.navigateToStore();
    await store.goToInventory();

    await inventory.increaseProductQuantity(
      PRODUCTS_QUANTITY.INCREASE.productIndex,
      PRODUCTS_QUANTITY.INCREASE.productName,
      8
    );

    await inventory.decreaseProductQuantity(
      PRODUCTS_QUANTITY.DECREASE.productIndex,
      PRODUCTS_QUANTITY.DECREASE.productName,
      5
    );
  });
});
