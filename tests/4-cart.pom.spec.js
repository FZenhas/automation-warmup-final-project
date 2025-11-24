import { test } from "@playwright/test";
import { StorePage } from "./pages/store.page";
import { CatalogPage } from "./pages/catalog.page";
import { CART_PRODS } from "./data/cart.data";
import { ADD_CART } from "./data/catalog.data";
import { CartPage } from "./pages/cart.page";

test.describe("Cart Page", () => {
 for (const prod of CART_PRODS) {
   test("Added to the Cart: " + prod.productName + " - " + prod.productQuantity + " items", async ({ page }) => {
   const cart = new CartPage(page);
   const store = new StorePage(page);
   const catalog = new CatalogPage(page);

   await store.navigateToStore();
   await store.goToCatalog();
   for (const add of ADD_CART) {
     await catalog.addProducttoCart(add);
   }
   await store.goToCart();
   await cart.verifyProductName(prod.productIndex, prod.productName);
   await cart.verifyProductPrice(prod.productIndex, prod.productPrice);
   await cart.verifyProductQuantity(prod.productIndex, prod.productQuantity);
   await cart.verifyProductTotal(prod.productIndex, prod.productPriceTotal);

   await cart.verifyCartTotal();
   await store.goToPayments();
   });
 }
});

// test("Verify all products added to the cart", async ({ page }) => {
//   const flow = new StoreFlow(page);

//   const cart = await flow.addProductsAndGoToCart();

//   for (const prod of CART_PRODS) {
//     await cart.verifyProduct(prod.productIndex, prod.productName);
//   }
// });