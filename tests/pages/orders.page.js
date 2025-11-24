import { expect, test } from "@playwright/test";

export class OrdersPage {
  constructor(page) {
    this.page = page;
  }

  orderDate(orderIndex) {
    return this.page.getByTestId(`order-date-${orderIndex}`);
  }

  orderPaymentMethod(orderIndex) {
    return this.page.getByTestId(`order-payment-${orderIndex}`);
  }

  orderItemName(orderIndex, productIndex) {
    return this.page.getByTestId(`order-item-name-${orderIndex}-${productIndex}`);
  }

   orderTotalValue(orderIndex) {
    return this.page.getByTestId(`order-total-value-${orderIndex}`);
  }



async validateOrderDetails(orderIndex, products) {
  await test.step("Validate Order Details", async () => {
    await test.step("Validate order date", async () => {
      await expect(this.orderDate(orderIndex)).toBeVisible();
    });

    await test.step("Validate order payment method", async () => {
      await expect(this.orderPaymentMethod(orderIndex)).toBeVisible();
    });

    for (const product of products) {
      await test.step(`Validate product ${product.productName}`, async () => {
        await expect(
          this.orderItemName(orderIndex, product.productIndex)
        ).toBeVisible();
      });
    }

    await test.step("Validate order total amount", async () => {
      await expect(this.orderTotalValue(orderIndex)).toBeVisible();
    });
  });
}


}
