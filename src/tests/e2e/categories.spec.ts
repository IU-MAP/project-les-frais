describe('Categories', () => {
  it('Should create new category Food of blue color', () => {
    // Go to categories page
    cy.register();
    cy.get('.header nav a[href*="/settings"]').click();
    cy.location('pathname').should('eq', '/settings');
    cy.get('.card.tabs-nav .tab:nth-child(2)').click();
    cy.contains('h1', 'All categories');

    // Add new category with name Food and color 12
    cy.get('.transaction-add-form .form-input.simple input').type('Food');
    cy.get('.transaction-add-form .dot.color-number-12').click();
    cy.get('.transaction-add-form .btn.add').click();

    // Assertions after adding new category
    cy.get('.transaction-add-form .form-input.simple input').should('have.value', '');
    cy.contains('.card .category .text-small', 'Food').prev().should('have.class', 'color-number-12');

    // Delete category
    cy.get('.card .category').click();
    cy.get('.transaction-add-form .form-input.simple input').should('have.value', 'Food');
    cy.get('.transaction-add-form .btn.remove').click();
    cy.contains('.card span', 'You don\'t have categories yet');

    cy.removeUser();
  });
});
