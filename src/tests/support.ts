import AuthCredentials from './fixtures/auth.json';

Cypress.Commands.add('register', () => {
  cy.visit('/signup');
  cy.get('.card form .form-input:nth-child(1)').type(AuthCredentials.email);
  cy.get('.card form .form-input:nth-child(2)').type(AuthCredentials.password);
  cy.get('.card form .form-input:nth-child(3)').type(AuthCredentials.password);
  cy.get('.card form .btn.submit').click();
  cy.location('pathname').should('eq', '/dashboard');
});

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('.card form .form-input:nth-child(1)').type(AuthCredentials.email);
  cy.get('.card form .form-input:nth-child(2)').type(AuthCredentials.password);
  cy.get('.card form .btn.submit').click();
  cy.location('pathname').should('eq', '/dashboard');
});

Cypress.Commands.add('logout', () => {
  cy.get('.header nav a[href*="/settings"]').click();
  cy.location('pathname').should('eq', '/settings');
  cy.url().should('include', '/settings');
  cy.contains('.card p', 'Log Out').next().click();
  cy.location('pathname').should('eq', '/');
});

Cypress.Commands.add('removeUser', () => {
  cy.get('.header nav a[href*="/settings"]').click();
  cy.location('pathname').should('eq', '/settings');
  cy.contains('.card p', 'Delete account').next().click();
  cy.contains('.card p', 'Delete account').next().click();
  cy.location('pathname').should('eq', '/');
});

Cypress.Commands.add('addCategory', () => {
  // Go to the category settings page
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
});
