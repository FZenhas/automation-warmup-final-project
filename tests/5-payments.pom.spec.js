import { test } from "@playwright/test";
import { StoreFlow } from "./pages/store-flow.page";
import { PaymentPage } from "./pages/payments.page";
import { StorePage } from "./pages/store.page";
import { CART_PRODS } from "./data/cart.data";
import { ADD_CART } from "./data/catalog.data";

test("Validate empty payment", async ({ page }) => {
  const flow = new StoreFlow(page);
  const payment = new PaymentPage(page);

  // Este método executa todo o fluxo e coloca-te nos Payments
  await flow.goToPaymentsWithProducts();

  await payment.validateEmptyPayment();
});

test("Payment page - validate information", async ({ page }) => {
  const flow = new StoreFlow(page);
  const payment = new PaymentPage(page);

  // Este método executa todo o fluxo e coloca-te nos Payments
  await flow.goToPaymentsWithProducts();

  for (const prod of CART_PRODS){
    await payment.validatePaymentSummary(prod.productIndex, prod.productName);
  }

  await payment.verifyTotalPayment();
  await payment.validatePaymentMethodSection();
});

test("Payment page - Choose Payment and Confirm", async ({ page }) => {
  const flow = new StoreFlow(page);
  const payment = new PaymentPage(page);
  const store = new StorePage(page);

  // Este método executa todo o fluxo e coloca-te nos Payments
  await flow.goToPaymentsWithProducts();
  await payment.confirmPayment();
  await store.goToOrders();
});