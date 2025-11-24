# Final Project – Test Automation with Playwright

## Base URL for Tests  
The automated tests are designed to run against the following base website:  
https://playground-drab-six.vercel.app/

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

