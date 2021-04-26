import AuthCredentials from '../fixtures/auth.json';

describe('Authentication', () => {
  it('Should create profile', () => {
    cy.register();
  });

  it('Should fail on second sign up', () => {
    cy.visit('/signup');
    cy.get('.card form .form-input:nth-child(1)').type(AuthCredentials.email);
    cy.get('.card form .form-input:nth-child(2)').type(AuthCredentials.password);
    cy.get('.card form .form-input:nth-child(3)').type(AuthCredentials.password);
    cy.get('.card form .btn.submit').click();
    cy.contains('.form-input_error', 'A user is already registered with this e-mail address.');
  });

  it('Should login and logout', () => {
    cy.login();
    cy.logout();
  });

  it('Should login and delete account', () => {
    cy.login();
    cy.removeUser();
  });
});
