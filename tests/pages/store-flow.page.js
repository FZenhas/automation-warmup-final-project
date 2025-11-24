// This page object manages store workflows, such as adding products to the cart,
// proceeding to payment, and navigating to order details, by combining actions from Store, Catalog, Cart, and Payment pages.

import { StorePage } from "./store.page";
import { CatalogPage } from "./catalog.page";
import { CartPage } from "./cart.page";
import { ADD_CART } from "../data/catalog.data";
import { PaymentPage } from "./payments.page";

export class StoreFlow {
  constructor(page) {
    /** Locators **/
    this.page = page;
    this.store = new StorePage(page);
    this.catalog = new CatalogPage(page);
    this.cart = new CartPage(page);
    this.payment = new PaymentPage(page);
  }

  /*
   ** Adds all products defined in ADD_CART to the cart and navigates to the cart page.
   ** Returns the cart object for further actions.
   */
  async addProductsAndGoToCart() {
    await this.store.navigateToStore();
    await this.store.goToCatalog();

    for (const add of ADD_CART) {
      await this.catalog.addProducttoCart(add);
    }

    await this.store.goToCart();
    return this.cart;
  }

  /*
   **Adds all products to the cart, navigates to the cart, and proceeds to the payments page.
   **Returns true to indicate successful navigation to the payments page
   */
  async goToPaymentsWithProducts() {
    await this.store.navigateToStore();
    await this.store.goToCatalog();

    for (const add of ADD_CART) {
      await this.catalog.addProducttoCart(add);
    }

    await this.store.goToCart();
    await this.store.goToPayments();

    return true;
  }

  /*
   **Adds all products to the cart, navigates through cart and payments, confirms the payment,
   **and then goes to the orders details page.
   **Returns true to indicate successful navigation to the orders details page.
   */
  async goToOrdersDetails() {
    await this.store.navigateToStore();
    await this.store.goToCatalog();

    for (const add of ADD_CART) {
      await this.catalog.addProducttoCart(add);
    }

    await this.store.goToCart();
    await this.store.goToPayments();
    await this.payment.confirmPayment();
    await this.store.goToOrders();

    return true;
  }
}
