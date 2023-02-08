class Product {

    verifyTitle() {
        return cy.get('.title').contains('Products');
        }
        
        addProductToCart() {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        }
        
        verifyShoppingCartBadge() {
        return cy.get('#shopping_cart_container .shopping_cart_badge');
        }
        
        openShoppingCart() {
        cy.get('#shopping_cart_container').click();
        }
        
        verifyProductName() {
        return cy.get('.inventory_item_name').contains('Sauce Labs Backpack');
        }

}


module.exports = new Product()