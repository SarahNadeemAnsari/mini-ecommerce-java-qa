Feature: View Products (Index Page)

Objective:
Verify that products are fetched from the backend API and displayed as clickable product cards on the homepage.

Test Environment:
- OS: Windows
- Browser: Chrome
- Server: XAMPP (Apache + MySQL)
- URL: http://localhost/mini_ecommerce/static/index.html

Preconditions:
- Apache and MySQL services are running
- Product data exists in the database
- products.php API is accessible

Test Cases:

TC-01: Verify products load successfully
Steps:
1. Open the homepage URL
2. Observe the product listing section

Expected Result:
Product cards are displayed without errors.

TC-02: Verify product data accuracy
Steps:
1. Compare product name, price, and description with database records

Expected Result:
Displayed product data matches database values.

TC-03: Verify product images load correctly
Steps:
1. Observe product images on each card

Expected Result:
All images load without broken icons.

TC-04: Verify product cards are clickable
Steps:
1. Click on any product card

Expected Result:
User is redirected to product detail page with correct product ID in URL.

TC-05: Verify page stability
Steps:
1. Refresh the page multiple times

Expected Result:
No crashes or console errors occur.
