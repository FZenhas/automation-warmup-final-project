
const now = new Date();
const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD

export const ORDER_DETAILS = {
  orderIndex: 0,
  orderDate: formattedDate,
  paymentMethod: "PayPal",
  products: [
    { productIndex: 0, productName: "Lightsaber (Star Wars)" },
    { productIndex: 1, productName: "Giant Rubber Duck" },
    { productIndex: 2, productName: "Shark Repellent" },
    { productIndex: 3, productName: "Aluminum Helmet" },
    { productIndex: 4, productName: "Sonic Screwdriver" }
  ],
};
