This is a simple Playwright test automation script for Buhler's SauceDemo Web Application.

Pre-requisites:
1. Visual Studio Code
2. Playwright VS code extension

Test Cases:
--Test Group: 'User login operation' - This is the test group in testing User Login and Logout functionalities.
---Test Cases:
----'Testing standard user valid login'
----'Testing invalid login using locked_user credential'
----'Testing Logout'

--Test Group: 'Testing User Checkout' - This is the test group in testing Add to basket functionalities.
---Test Cases:
----'User add products in basket'
----'Calculated total price in checkout'
----'User remove products in basket'
----'User checkout products'

Class Modules:
-'cart.spec.ts' - for product lists and add/remove functions
-'user.spec.ts' - for user login and logout functions

