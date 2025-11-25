import { test } from "@playwright/test";
import { StorePage } from "./pages/store.page";
import { CatalogPage } from "./pages/catalog.page";
import { ADD_CART } from "./data/catalog.data";

test.describe("Store Catalog", () => {
  test("Add Products to The Cart and check out-of-stock items", async ({ page }) => {
    const catalog = new CatalogPage(page);
    const store = new StorePage(page);

    await store.navigateToStore();
    await store.goToCatalog();

    for (const add of ADD_CART) {
      await catalog.addProducttoCart(add);
    }
    await store.goToCart();
  });
});