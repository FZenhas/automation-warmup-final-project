# Final Project – Test Automation Warm-Up with Playwright

This is my final project of the course **"Test Automation Warm-Up with Playwright"** at **Mindera Code Academy**.

This project aims to provide test coverage of the core Store features, including **Inventory, Catalog, Cart, Payment, and Orders**.


## Base URL for Tests  
The automated tests were designed to run against the following base website. 
This website was developed by the course instructor, **Bruno Machado**.

https://playground-drab-six.vercel.app/

---
## Project Setup
For the installation of the project, I used the following command:
```bash
npm init playwright@latest
```
---

## Project Structure
The project is organized following the **Page Object Model (POM)** pattern to ensure maintainability and scalability:

```
tests/
├── data/                   # Test data files
│   ├── cart.data.js
│   ├── catalog.data.js
│   ├── inventory.data.js
│   ├── orders.data.js
│   └── payments.data.js
│
├── pages/                  # Page Objects representing UI pages
│   ├── cart.page.js
│   ├── catalog.page.js
│   ├── inventory.page.js
│   ├── orders.page.js
│   ├── payments.page.js
│   ├── store-flow.page.js   # Contains high-level store workflows
│   └── store.page.js
│
├── 1-store.pom.spec.js     # Test specs named and ordered by feature
├── 2-inventory.pom.spec.js
├── 3-catalog.pom.spec.js
├── 4-cart.pom.spec.js
├── 5-payments.pom.spec.js
└── 6-orders.pom.spec.js
```
---

## Explanation
- **data/**: Contains static or dynamic test data to drive the tests.
- **pages/**: Contains page object files where UI elements and related actions are encapsulated.
- **store-flow.page.js**: Implements combined flows involving multiple pages for complex scenarios.
- **spec files**: Organized by feature and named sequentially for clarity and execution order.

## Running Tests

To run the automated tests, you can use the Playwright commands:

- **Open Playwright Test UI (recommended):**  
  📋 `npx playwright test --ui`

- **Run all tests from Command-Line Interface:**  
  📋 `npx playwright test`

- **Show the test report in a browser:**  
  📋 `npx playwright show-report`



# Store Test Scenarios

## Store
### Validate navigation across the store
- Start on Home page → ensure page loads correctly
- Navigate to Inventory page → ensure page loads correctly
- Navigate to Catalog page → ensure page loads correctly
- Navigate to Cart page → ensure page loads correctly
- Navigate to Payment page → ensure page loads correctly
- Navigate to Orders page → ensure page loads correctly

---

## Inventory
### Add a new product and verify
- Go to Inventory page
- Fill in Name, Price, Quantity
- Click “Add Product”
- Product appears in the bottom of the inventory

### Adjust stock quantity
- Given a product exists
- Click “+” → quantity increases by 1
- Click “–” → quantity decreases by 1

---

## Catalog
### Add an item to the cart
- Go to Catalog page
- Click “Add to Cart”
- Item quantity decreases in Catalog
- Item appears in Cart page

## Prevent adding out-of-stock items
- If item quantity is 0
- “Add to Cart” button shows “Out of Stock”
- Item cannot be added to the cart
---
## Cart
### Display cart items and totals and Proceed to Payment step
- Have items in the cart
- Go to Cart page
- Each item shows name, quantity, and subtotal
- Show total amount
- Click “Go to Payments”
- Redirected to Payment page

---

## Payment
### Validate payment summary
- Have items in the cart
- Go to Payment page
- Summary shows each item’s name, quantity, and subtotal
- Total amount is displayed at the bottom

### Block payment without method
- Have items in the cart
- Click “Confirm Payment” without selecting a method
- Alert appears
- Payment is not completed

### Complete a purchase
- Select a payment method
- Click “Confirm Payment”
- Order is created
- Redirected to Orders page

---

## Orders
### Display order details
- Given an order exists
- View the order
- Order shows:
  - Date
  - Payment method
  - Items (name + quantity)
  - Final total



