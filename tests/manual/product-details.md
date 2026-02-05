Feature: Product Detail Page

Objective:
Verify that individual product details are displayed correctly and the product can be added to cart.

Test Environment:
- OS: Windows
- Browser: Chrome
- Server: XAMPP (Apache + MySQL)
- URL Pattern: http://localhost/mini_ecommerce/static/product.html?id={product_id}

Preconditions:
- Products exist in database
- User navigates from index page
- Browser localStorage is enabled

Test Cases:

TC-01: Verify product details load
Steps:
1. Click a product from the index page

Expected Result:
Correct product name, image, description, and price are displayed.

TC-02: Verify correct product based on ID
Steps:
1. Click different products from index page

Expected Result:
Each product page displays corresponding product data.

TC-03: Verify Add to Cart functionality
Steps:
1. Click “Add to Cart” button

Expected Result:
Product is added to cart and success message is shown.

TC-04: Verify cart persistence
Steps:
1. Refresh page after adding product

Expected Result:
Cart data remains saved in localStorage.

TC-05: Verify page stability
Steps:
1. Refresh page and navigate back and forth

Expected Result:
No crashes or JS errors occur.
