import { test } from "@playwright/test";
import { ORDER_DETAILS } from "./data/orders.data";
import { OrdersPage } from "./pages/orders.page";
import { StoreFlow } from "./pages/store-flow.page";

test.describe("Orders Page", () => {
  test("Order page - validate order details", async ({ page }) => {
    const order = new OrdersPage(page);
    const flow = new StoreFlow(page);

    /** This method runs the entire flow up to the order details **/ 
    await flow.goToOrdersDetails();

    await order.validateOrderDetails(
      ORDER_DETAILS.orderIndex,
      ORDER_DETAILS.products
    );
  });
});
