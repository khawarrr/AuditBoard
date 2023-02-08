import Checkout from '../pageObjectsSwagLab/checkoutPage'
import Login from '../pageObjectsSwagLab/loginPage'
import Logout from '../pageObjectsSwagLab/logout'
import Product from '../pageObjectsSwagLab/products'


describe('Login flow test', () => {
 
  
  it('Verify Sauce Demo Login page loads sucessfully', () => {
    cy.visit('www.saucedemo.com')

  });

  it('Verify Login fails with invalid credentials', () => {
    Login.enterUserName('WRONG_USER')
    Login.enterPassword('secret_sauce')
    Login.loginButton()
    // test that error box class is visible on the page when loggin in with the wrong credentials.
    Login.errorMessage()
    // remove the error box first
    Login.removeErrorMessage()
    
  });
  
  it('Verify login is successful with valid credentials', () => {
    // clear the input from username and password from the test case above
    Login.clearUserNameField()
    Login.clearPasswordField()

    Login.enterUserName('standard_user')
    Login.enterPassword('secret_sauce')
    Login.loginButton()
    // following step verfify login is successful and product inventory is visible
    Login.verifyOnHomePage()
    Login.productsVisibility()
    
  });
  
  it('Verify user can add a product to cart', () => {
    Product.verifyTitle()
    Product.addProductToCart()
    Product.verifyShoppingCartBadge()
    Product.openShoppingCart()
    Product.verifyProductName()  
  });

  it('Verify user can checkout cart successfully', () => {
    Checkout.checkoutButton()
    Checkout.checkoutInformationTitle()
    Checkout.fillFirstName('Khawar')
    Checkout.fillLastName('Khan')
    Checkout.fillPostalCode('90034')
    Checkout.continueCheckout()

    // confirm we are on the summary page
    Checkout.verifyCheckoutOverviewTitle()
    Checkout.finishCheckout()
    // confirming the order has been placed
    Checkout.verifyOrderConfirmationMessage()
    //take us back to inventory list
    Checkout.goBackToProducts()
    // following step verfify that we are back on the products page
    Login.verifyOnHomePage()
    Login.productsVisibility()

  });

  it('Verify user can logout successfully', () => {
    Logout.hamburgerButton()
    Logout.logoutButton()
    // confirm we are back to login page
    cy.get('[data-test="login-button"]').should('be.visible')

  });

})
