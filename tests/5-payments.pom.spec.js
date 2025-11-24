import { test } from "@playwright/test";
import { StoreFlow } from "./pages/store-flow.page";
import { PaymentPage } from "./pages/payments.page";
import { StorePage } from "./pages/store.page";
import { CART_PRODS } from "./data/cart.data";

test.describe("Payment Page", () => {

  test("Validate Payment Information", async ({ page }) => {
    const flow = new StoreFlow(page);
    const payment = new PaymentPage(page);

    /** This method runs the entire flow up to the payments **/ 
    await flow.goToPaymentsWithProducts();

    for (const prod of CART_PRODS) {
      await payment.validatePaymentSummary(prod.productIndex, prod.productName);
    }

    await payment.verifyTotalPayment();
    await payment.validatePaymentMethodSection();
  });

  test("Click to Confirm Payment with no Payment Adeed", async ({ page }) => {
    const flow = new StoreFlow(page);
    const payment = new PaymentPage(page);

    /** This method runs the entire flow up to the payments **/ 
    await flow.goToPaymentsWithProducts();

    await payment.validateEmptyPayment();
  });

  test("Choose Payment Method and Confirm", async ({ page }) => {
    const flow = new StoreFlow(page);
    const payment = new PaymentPage(page);
    const store = new StorePage(page);

    /** This method runs the entire flow up to the payments **/ 
    await flow.goToPaymentsWithProducts();
    
    await payment.confirmPayment();
    await store.goToOrders();
  });
});
