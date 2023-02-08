class Checkout{

    checkoutButton() {
    return cy.get('[data-test="checkout"]').click()
    }

    checkoutInformationTitle() {
    return cy.get('.title').contains('Checkout: Your Information');
    }

    fillFirstName(firstName) {
    cy.get('[data-test="firstName"]').type(firstName);
    }

    fillLastName(lastName) {
    cy.get('[data-test="lastName"]').type(lastName);
    }

    fillPostalCode(postalCode) {
    cy.get('[data-test="postalCode"]').type(postalCode);
    }

    continueCheckout() {
    cy.get('[data-test="continue"]').should('be.visible').click();
    }

    verifyCheckoutOverviewTitle() {
    return cy.get('.title').contains('Checkout: Overview');
    }

    finishCheckout() {
    cy.get('[data-test="finish"]').should('be.visible').click();
    }

    verifyOrderConfirmationMessage() {
    return cy.get('.complete-header').contains('THANK YOU FOR YOUR ORDER');
    }

    goBackToProducts() {
    cy.get('[data-test="back-to-products"]').should('be.visible').click();
    }

}

module.exports = new Checkout()