describe('Login flow test', () => {
 
  
  it('visit the website', () => {
    cy.visit('www.saucedemo.com')
  });

  it('Verify login successfully', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', 'inventory.html')
  })
  
  it('Verify add the product to cart',{ scrollBehavior: false }, () => {
    cy.get('.title').contains('Products').should('be.visible')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('#shopping_cart_container .shopping_cart_badge')
      .should('exist');

    cy.get('#shopping_cart_container').click()
    cy.get('.inventory_item_name')
      .contains('Sauce Labs Backpack')
        .should('be.visible')
    
  })

  it('Verify checkout process', () => {
    cy.get('[data-test="checkout"]').click()
    cy.get('.title').contains('Checkout: Your Information').should('be.visible')
    cy.get('[data-test="firstName"]').type('Khawar')
    cy.get('[data-test="lastName"]').type('Khan')
    cy.get('[data-test="postalCode"]').type('90034')
    cy.get('[data-test="continue"]').click()

    // confirm we are on the summary page
    cy.get('.title').contains('Checkout: Overview').should('be.visible')

    cy.get('[data-test="finish"]').click()
    // confirming the order has been placed
    cy.get('.complete-header').contains('THANK YOU FOR YOUR ORDER').should('be.visible')
    //take us back to inventory list
    cy.get('[data-test="back-to-products"]').click() 
  })

  it('Verify logout successfully', () => {
    cy.get('.bm-burger-button').click()
    cy.get('nav').children('#logout_sidebar_link')
      .contains('Logout')
        .should('be.visible').click()
    // confirm we are back to login page
    cy.get('[data-test="login-button"]').should('be.visible')

  })

})
