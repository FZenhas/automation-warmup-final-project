import { StorePage } from "./store.page";
import { CatalogPage } from "./catalog.page";
import { CartPage } from "./cart.page";
import { ADD_CART } from "../data/catalog.data";
import { PaymentPage } from "./payments.page";

export class StoreFlow {
  constructor(page) {
    this.page = page;
    this.store = new StorePage(page);
    this.catalog = new CatalogPage(page);
    this.cart = new CartPage(page);
    this.payment = new PaymentPage(page);
  }

  async addProductsAndGoToCart() {
    await this.store.navigateToStore();
    await this.store.goToCatalog();

    for (const add of ADD_CART) {
      await this.catalog.addProducttoCart(add);
    }

    await this.store.goToCart();
    return this.cart;
  }

  async goToPaymentsWithProducts() {
    await this.store.navigateToStore();
    await this.store.goToCatalog();

    for (const add of ADD_CART) {
      await this.catalog.addProducttoCart(add);
    }

    await this.store.goToCart();
    await this.store.goToPayments();

    return true; // apenas para sinalizar que já estás nos payments
  }

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

    return true; // apenas para sinalizar que já estás nos orders
  }
}