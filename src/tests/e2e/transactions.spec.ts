describe('Transactions', () => {
  it('Should create new transaction', () => {
    // Register and add new category
    cy.register();
    cy.addCategory();

    // Go to the main page
    cy.get('.header .logo').click();
    cy.location('pathname').should('eq', '/dashboard');

    // Add new transaction: a loss with price 200
    cy.get('.transaction-add-form_trigger .form-input:nth-of-type(1)').click();
    cy.get('.transaction-add-form_trigger .form-input:nth-of-type(1)').type('Lunch in the canteen');
    cy.get('.transaction-add-form_trigger .form-input:nth-of-type(2)').type('200');
    cy.get('.transaction-add-form_trigger .btn.add').click();

    // Assert the correctness
    cy.contains('.transactions-list_grid .transaction .title', 'Lunch in the canteen');
    cy.contains('.transactions-list_grid .transaction .price', '-200.00₽');

    cy.removeUser();
  });
});
