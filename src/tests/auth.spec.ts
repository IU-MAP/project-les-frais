const AuthCredentials = {
  email: 'test@example.com',
  password: 'ra8nd2om5Pas!word',
};

const login = () => {
  cy.visit('/login');
  cy.get('.card form .form-input:nth-child(1)').type(AuthCredentials.email);
  cy.get('.card form .form-input:nth-child(2)').type(AuthCredentials.password);
  cy.get('.card form .btn.submit').click();
  cy.location('pathname').should('eq', '/dashboard');
};

const logout = () => {
  cy.get('.header nav a[href="/settings"]').click();
  cy.location('pathname').should('eq', '/settings');
  cy.url().should('include', '/settings');
  cy.contains('.card p', 'Log Out').next().click();
  cy.location('pathname').should('eq', '/');
};

const register = () => {
  cy.visit('/signup');
  cy.get('.card form .form-input:nth-child(1)').type(AuthCredentials.email);
  cy.get('.card form .form-input:nth-child(2)').type(AuthCredentials.password);
  cy.get('.card form .form-input:nth-child(3)').type(AuthCredentials.password);
  cy.get('.card form .btn.submit').click();
  cy.location('pathname').should('eq', '/dashboard');
};

const removeUser = () => {
  cy.get('.header nav a[href="/settings"]').click();
  cy.location('pathname').should('eq', '/settings');
  cy.contains('.card p', 'Delete account').next().click();
  cy.location('pathname').should('eq', '/');
};

describe('Authentication', () => {
  it('Should create profile', () => {
    register();
  });

  it('Should login and logout', () => {
    login();
    logout();
  });

  it('Should login and delete account', () => {
    login();
    removeUser();
  });
});
