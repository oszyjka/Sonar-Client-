/* eslint-disable no-undef */
describe('Shop App Functional Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  // Tests page (buttons,price display and others)   
  it('1. Display price for Laptop', () => {
    cy.contains('Laptop - $1999').should('exist');
  });

  it('2. Display "Buy" button for each item', () => {
    cy.get('button').filter(':contains("Buy")').should('have.length', 6);
  });

  it('3. Page loads correctly with title', () => {
    cy.title().should('include', 'Vite');
  });

  it('4. Buy buttons are clickable', () => {
    cy.get('button').contains('Buy').each(($btn) => {
      cy.wrap($btn).should('be.visible');
      cy.wrap($btn).should('not.be.disabled');
      cy.wrap($btn).should('have.text', 'Buy');
    });
  });

  it('5. Header links are visible', () => {
    cy.contains('Products').should('be.visible');
    cy.contains('Cart').should('be.visible');
    cy.contains('Payments').should('be.visible');
  });

  it('6. Display duplicate product names', () => {
    cy.get('li').filter(':contains("Monitor")').should('have.length.at.least', 2);
  });

  // Navigation tests
  it('7. Navigate to Cart page', () => {
    cy.contains('Cart').click();
    cy.contains('Cart').should('exist');
  });

  it('8. Navigate to Payments page', () => {
    cy.contains('Payments').click();
    cy.contains('Payment').should('exist');
  });

  it('9. Navigate to Products page', () => {
    cy.contains('Products').click();
    cy.contains('Products').should('exist');
  });

  // Product listing
  it('10. Display list of products', () => {
    cy.contains('Laptop').should('exist');
    cy.contains('T-Shirt').should('exist');
  });

  // Cart tests
  it('11. Add item to cart and updates count', () => {
    cy.get('button').contains('Buy').first().click();
    cy.contains('Cart (1)').should('exist');
  });

  it('12. Add multiple items to cart', () => {
    cy.get('button').filter(':contains("Buy")').eq(0).click();
    cy.get('button').filter(':contains("Buy")').eq(1).click();
    cy.contains('Cart (2)').should('exist');
  });

  it('13. Display added items in the cart', () => {
    cy.get('button').contains('Buy').eq(0).click();
    cy.contains('Cart').click();
    cy.contains('Laptop').should('exist');
    cy.contains('$1999').should('exist');
    cy.get('button').contains('Remove').should('exist');
  });

  it('14. Remove item from cart', () => {
    cy.get('button').filter(':contains("Buy")').eq(1).click();
    cy.contains('Cart').click();
    cy.get('button').contains('Remove').click();
    cy.contains('T-Shirt').should('not.exist');
  });

  it('15. Show empty cart if nothing is added', () => {
    cy.contains('Cart').click();
    cy.contains('Your cart is empty.').should('exist');
  });

  it('16. Cart updates after item removal', () => {
    cy.get('button').contains('Buy').first().click();
    cy.contains('Cart').click();
    cy.get('button').contains('Remove').click();
    cy.contains('Cart (0)').should('exist');
  });

  // Payment tests
  it('17. Payment unavailable with empty cart', () => {
    cy.contains('Payments').click();
    cy.get('button').contains('Pay for 0 items').should('exist');
    cy.get('button').contains('Pay for 0 items').should('be.disabled');
  });

  it('18. Payment unavailable without user name', () => {
    cy.contains('Payments').click();
    cy.get('input[placeholder="Your name"]').should('have.value', '');
    cy.get('button').contains('Pay for 0 items').should('be.disabled');
  });

  it('19. Show cart item before payment', () => {
    cy.get('button').contains('Buy').first().click();
    cy.contains('Payments').click();
    cy.get('button').contains('Pay for 1 items').should('exist');
  });

  it('20. Put user name', () => {
    cy.get('button').contains('Buy').first().click();
    cy.contains('Payments').click();
    cy.get('input[placeholder="Your name"]').type('Anna');
    cy.get('button').contains('Pay for 1 items').should('not.be.disabled');
  });

  it('21. Payment successful', () => {
    cy.get('button').contains('Buy').first().click();
    cy.contains('Payments').click();
    cy.get('input[placeholder="Your name"]').type('Anna');
    cy.get('button').contains('Pay for 1 items').click();
    cy.contains('Payment successful').should('exist');
    cy.contains('Cart (0)').should('exist');
    cy.contains('Pay for 0 items').should('exist');
    cy.get('input[placeholder="Your name"]').should('have.value', '');
    cy.get('button').contains('Pay for 0 items').should('be.disabled');
  });
});
