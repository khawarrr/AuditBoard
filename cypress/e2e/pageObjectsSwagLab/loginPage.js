class Login {
    clearUserNameField(){
        cy.get('[data-test="username"]').clear()
    }

    clearPasswordField(){
        cy.get('[data-test="password"]').clear()
    }

    enterUserName(username){
        cy.get('[data-test="username"]').type(username)
    }

    enterPassword(password) {
        cy.get('[data-test="password"]').type(password)
    }

    loginButton() {
        cy.get('[data-test="login-button"]').click()

    }

    verifyOnHomePage() {
        cy.url().should('include', 'inventory.html')
        
    }
    
    productsVisibility(){
        cy.get('#inventory_container').should('be.visible')
    }

    errorMessage(){
        cy.get('[data-test="error"]').should('be.visible')
    }

    removeErrorMessage(){
        cy.get('.error-button').click()
    }


}

module.exports = new Login();
