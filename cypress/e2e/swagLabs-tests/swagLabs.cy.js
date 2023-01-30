describe('Login flow test', () => {
 
  
  it('Verify Sauce Demo home page loads sucessfully', () => {
    cy.visit('www.saucedemo.com')
  });

  it('Verify Login fails with invalid credentials', () => {
    cy.get('[data-test="username"]').type('WRONG_USER')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    // test that error box class is visible on the page when loggin in with the wrong credentials.
    cy.get('[data-test="error"]').should('be.visible')
    // remove the error box first
    cy.get('.error-button').click()
    
  });
  
  it('Verify login is successful with valid credentials', () => {
    // clear the input from username and password
    cy.get('[data-test="username"]').clear()
    cy.get('[data-test="password"]').clear()

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    // following step verfify login is successful and product inventory is visible
    cy.url().should('include', 'inventory.html')
    cy.get('#inventory_container').should('be.visible')
  });
  
  it('Verify user can add a product to cart', () => {
    cy.get('.title').contains('Products').should('be.visible')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('#shopping_cart_container .shopping_cart_badge').scrollIntoView()
      .should('be.visible');

    cy.get('#shopping_cart_container').click()
    cy.get('.inventory_item_name')
      .contains('Sauce Labs Backpack')
        .should('be.visible')
    
  });

  it('Verify user can checkout cart successfully', () => {
    cy.get('[data-test="checkout"]').click()
    // cy.pause()
    cy.get('.title').contains('Checkout: Your Information').should('be.visible')
    cy.get('[data-test="firstName"]').type('Khawar')
    cy.get('[data-test="lastName"]').type('Khan')
    cy.get('[data-test="postalCode"]').type('90034')
    cy.get('[data-test="continue"]').should('be.visible').click()

    // confirm we are on the summary page
    cy.get('.title').contains('Checkout: Overview').should('be.visible')

    cy.get('[data-test="finish"]').should('be.visible').click()
    // confirming the order has been placed
    cy.get('.complete-header').contains('THANK YOU FOR YOUR ORDER').should('be.visible')
    //take us back to inventory list
    cy.get('[data-test="back-to-products"]').should('be.visible').click() 
  });

  it('Verify user can logout successfully', () => {
    cy.get('.bm-burger-button').should('be.visible').click()
    cy.get('nav').children('#logout_sidebar_link')
      .contains('Logout')
        .should('be.visible').click()
    // confirm we are back to login page
    cy.get('[data-test="login-button"]').should('be.visible')

  });

})
