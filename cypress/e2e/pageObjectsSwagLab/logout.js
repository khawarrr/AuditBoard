class Logout{

    hamburgerButton() {
        return cy.get('.bm-burger-button').should('be.visible').click()
        }
        
    logoutButton() {
    return cy.get('nav').children('#logout_sidebar_link')
    .contains('Logout').should('be.visible').click()
    }


}

module.exports = new Logout()