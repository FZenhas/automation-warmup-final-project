import { test } from "@playwright/test";
import { StorePage } from "./pages/store.page";

test.describe("Store", () => {
  test("Store | Home", async ({ page }) => {
    const store = new StorePage(page);

    await store.navigateToStore();
    await store.goToInventory();
    await store.goToCatalog();
    await store.goToCart();
    await store.goToPayments();
    await store.goToOrders();
  });
});
