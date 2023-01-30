describe('Login flow test', () => {
 
  
  it('visit', () => {
 
    // cy.clearCookie('session-username')
    cy.visit('www.saucedemo.com')
    // cy.getCookies()

    
  });
  
  
  

  it('should login successfully', () => {
  

    // cy.visit('https://www.saucedemo.com', {
      
    //   onBeforeLoad: (win) => {
    //     win.sessionStorage.clear()
        
        
    //   }
      
    // })
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    cy.url().should('include', 'inventory.html')
  })
  
  // it('should search for a product successfully', () => {
  //   cy.get('.title').contains('Products').should('be.visible')

  // })

  it('should add Sauce Labs Backpack product to the cart successfully',{ scrollBehavior: false }, () => {
    // cy.visit('https://www.saucedemo.com/')
    // cy.get('inventory_item_name').first().contains('Sauce Labs Backpack')
    cy.get('.title').contains('Products').should('be.visible')
    

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

 

    /* when an element is hidden or is pushed out of the screen because of some CSS issues, 
    it doesn't exist from user perspective. */
    cy.get('#shopping_cart_container .shopping_cart_badge')
      .should('exist');

    cy.get('#shopping_cart_container').click()
    cy.get('.inventory_item_name')
      .contains('Sauce Labs Backpack')
        .should('be.visible')
    
  })

  it('should complete the checkout process successfully', () => {
    // cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="checkout"]').click()

    // confirm that we are on checkout page
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

    cy.get('[data-test="back-to-products"]').click() //take us back to inventory list

  })

  it('should logout successfully', () => {

    cy.get('.bm-burger-button').click()
    cy.get('nav').children('#logout_sidebar_link')
      .contains('Logout')
        .should('be.visible').click()

    // confirm we are back to login page
    cy.get('[data-test="login-button"]').should('be.visible')

  })

  it('clear everything', () => {
    // cy.clearLocalStorage() // clear all local storage
    // cy.clearCookies() // Clear cookies for the currrent domain
    // cy.getCookies().should('have.length', 2)
    // cy.clearCookies()
    cy.Cookies.debug(true) // now Cypress will log when it alters cookies
    // cy.getCookies().should('be.empty')
    // cy.clearCookie('session-username')
    // cy.pause()
    // cy.clearCookie('__cypress.initial')

    cy.getCookies()

    
  })
  


})
