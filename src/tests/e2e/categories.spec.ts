describe('Categories', () => {
  it('Should create new category Food of blue color', () => {
    // Go to categories page
    cy.register();
    cy.addCategory();

    // Delete category
    cy.get('.card .category').click();
    cy.get('.transaction-add-form .form-input.simple input').should('have.value', 'Food');
    cy.get('.transaction-add-form .btn.remove').click();
    cy.contains('.card span', 'You don\'t have categories yet');

    cy.removeUser();
  });
});
