## 1. Document Information

| Field        | Value                       |
| ------------ | --------------------------- |
| Project      | Mini E-Commerce Application |
| Document     | Test Plan                   |
| Version      | 1.0                         |
| Author       | Sarah Nadeem                |
| Testing Type | Manual + Automation         |
| Environment  | Local                       |
| Application  | Mini E-Commerce             |
| Status       | Draft                       |
---

# 2. Project Overview

* Home page
* Product listing
* Product details
* User registration
* User login
* Shopping cart
* Anonymous shopping cart
* Authenticated shopping cart
* Checkout/demo order flow
* Admin page
* Backend APIs
* Database

---

# 3. Testing Objectives

* Verify that all major application functions operate as expected.
* Verify that users can register and authenticate successfully.
* Verify product information is correctly displayed.
* Verify users can add, update, and remove products from carts.
* Verify anonymous and authenticated cart behavior.
* Verify navigation between application pages.
* Verify invalid input is handled appropriately.
* Verify application behavior at boundary and negative conditions.
* Identify functional, usability, validation, and security defects.
* Verify that fixes do not break previously functioning features.
* Create a reliable manual test suite that can later be converted into Playwright automation.

---

# 4. Scope


### In Scope

**Authentication**

* User registration
* Login
* Logout
* Invalid credentials
* Input validation
* Session behavior

**Products**

* Product listing
* Product details
* Product information
* Product availability
* Product navigation

**Cart**

* Add product
* Remove product
* Change quantity
* Multiple products
* Empty cart
* Cart persistence
* Anonymous cart
* Authenticated cart
* Cart merging

**Checkout**

* Checkout flow
* Empty cart checkout
* Cart clearing after checkout
* Order confirmation behavior

**UI**

* Navigation
* Buttons
* Links
* Forms
* Page loading
* Basic responsive behavior

**Security**

* Authentication controls
* Authorization
* Input validation
* SQL injection attempts
* XSS attempts
* Session handling
* Sensitive information exposure

**API**

* Product API
* Authentication APIs
* Cart APIs
* Session APIs

That gives you a testing boundary.

---

# 5. Out of Scope

This is equally important.

You're not going to pretend you're testing Amazon's entire infrastructure from a laptop in Multan.

For this project, things like these could be out of scope:

* Real payment processing
* Real shipping providers
* Production infrastructure
* Third-party payment gateways
* Real customer data
* Large-scale production performance
* Real email delivery infrastructure
* Mobile native applications
* Production penetration testing

---

# 6. Application Modules

```
Mini E-Commerce
│
├── Home
│   ├── Navigation
│   ├── Featured Products
│   └── Shop Now
│
├── Authentication
│   ├── Signup
│   ├── Login
│   └── Logout
│
├── Products
│   ├── Product Listing
│   └── Product Details
│
├── Cart
│   ├── Add Product
│   ├── Update Quantity
│   ├── Remove Product
│   ├── Clear Cart
│   ├── Shipping
│   └── Checkout
│
├── Admin
│
└── APIs
    ├── Products
    ├── Signup
    ├── Login
    ├── Logout
    ├── Session
    └── Cart
```

---

# 7. Testing Types

### Smoke Testing

Very small set of tests answering:

> "Is this build/application basically usable?"

Examples:

* Application loads
* Login page loads
* User can register
* User can log in
* Products load
* Product details open
* Product can be added to cart
* Cart loads
* Checkout works

Smoke tests should be **small and fast**.

---

### Functional Testing

Tests whether each feature behaves according to its intended functionality.

Example:

> Verify that a registered user can log in using valid credentials.

---

### Negative Testing

Tests invalid or unexpected input.

Example:

> Attempt login using a valid email and incorrect password.

---

### Boundary Testing

Tests limits.

Examples:

* Password exactly 6 characters
* Password 5 characters
* Quantity 1
* Quantity 0
* Quantity greater than available stock
* Empty fields
* Extremely long input

---

### UI/Usability Testing

Examples:

* Buttons are visible
* Links work
* Navigation works
* Forms are understandable
* Error messages are visible
* Product information is readable

---

### Security Testing

Examples:

* SQL injection
* XSS
* Unauthorized access
* Session manipulation
* Authentication bypass
* Accessing another user's cart
\

---

### End-to-End Testing

Example:

```
Signup
 ↓
Login
 ↓
Browse products
 ↓
Open product
 ↓
Add product
 ↓
Open cart
 ↓
Change quantity
 ↓
Checkout
 ↓
Verify cart state
```


---

### Regression Testing

**Regression is not a completely separate universe of test cases.**

Regression is a **selection of existing test cases that you rerun after a change**.

For example, suppose you fix the login API.

You don't only test the exact login bug.

You rerun:

* Valid login
* Invalid password
* Invalid email
* Logout
* Session
* Cart authentication
* Authenticated cart
* Checkout

---

# 8. Test Environment


```text
Operating System: Windows 11
Web Server: Apache/XAMPP
PHP: 8.0.30
Database: MySQL
Browser: Google Chrome
Application URL:
http://localhost/mini_ecommerce/

Testing Type:
Manual testing

Future Automation:
Playwright + TypeScript
```


---

# 9. Test Data

Baseline:

Users: 0
Cart Items: 0
User Carts: 0

Products:
1. Classic Sneakers
2. Leather Wallet
3. Wireless Headphones
4. Ceramic Mug
5. Slim Backpack
6. Smartwatch X
```


---

# 10. Entry Criteria


**"When are we allowed to start testing?"**


* Application is accessible.
* Apache is running.
* MySQL is running.
* Database is accessible.
* Required tables exist.
* Product seed data exists.
* Application pages load.
* API endpoints are accessible.
* Test environment is available.
* Initial test data has been verified.


---

# 11. Exit Criteria


**"When do we consider this testing cycle finished?"**


* All planned critical test cases executed.
* All high-priority test cases executed.
* Critical defects resolved or documented.
* Regression suite completed after fixes.
* No unresolved blocker preventing core user journeys.
* Test results documented.
* Defects documented.
* Automation candidates identified.
* Final test summary prepared.

---

# 12. Risk Assessment

For example:

| Risk                     | Impact | Probability | Mitigation                                 |
| ------------------------ | ------ | ----------- | ------------------------------------------ |
| Authentication failure   | High   | Medium      | Thorough positive/negative testing         |
| Cart data loss           | High   | Medium      | Test cart persistence and session behavior |
| Incorrect stock handling | High   | Medium      | Boundary and negative testing              |
| Invalid user input       | Medium | High        | Validation testing                         |
| API failure              | High   | Medium      | API and UI integration testing             |
| Security vulnerability   | High   | Medium      | Security-focused test scenarios            |


---

# 13. Defect Management


Bug discovered
       ↓
Reproduce
       ↓
Document steps
       ↓
Assign severity
       ↓
Capture evidence
       ↓
Record defect
       ↓
Developer fixes
       ↓
Retest
       ↓
Regression
       ↓
Close / Reopen
```

---

# 14. Regression Strategy


> Regression testing will be performed after functional changes or defect fixes to verify that existing functionality remains unaffected.


**Critical user paths → Authentication → Products → Cart → Checkout → APIs → Security-sensitive functionality**

---

# 15. Automation Strategy


> Manual test cases will initially be created and executed to establish expected application behavior and identify functional defects. Stable, repeatable, high-value test cases will subsequently be selected for automation using Playwright with TypeScript.

Manual Test Case
       ↓
Manually Execute
       ↓
Verify Expected Behavior
       ↓
Stable Test?
       ↓
Automation Candidate
       ↓
Playwright + TypeScript
       ↓
Automated Regression Suite
```

---

# 16. Deliverables

1. Test Plan
2. Test Scenario Matrix
3. Manual Test Case Suite
4. Test Execution Results
5. Defect Log
6. Smoke Test Suite
7. Regression Test Suite
8. End-to-End User Journey Suite
9. Security Test Suite
10. Test Summary Report
11. Playwright Automation Suite
12. Automation Test Report
```


---

