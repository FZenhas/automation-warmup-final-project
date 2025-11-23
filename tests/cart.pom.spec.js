import { test } from "@playwright/test";
import { StorePage } from "./pages/store.page";
import { CatalogPage } from "./pages/catalog.page";
import { ADD_CART, CART_PRODS } from "./data/store.data";
import { CartPage } from "./pages/cart.page";


 for (const prod of CART_PRODS) {
   test("Product added: " + prod.productName + " - " + prod.productQuantity + " items", async ({ page }) => {
   const cart = new CartPage(page);
   const store = new StorePage(page);
   const catalog = new CatalogPage(page);

   await store.navigateToStore();
   await store.goToCatalog();
   for (const add of ADD_CART) {
     await catalog.addProducttoCart(add);
   }
   await store.goToCart();
   await cart.verifyProduct(prod.productIndex, prod.productName);
   });
 }