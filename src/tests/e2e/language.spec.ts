describe('Translation', () => {
  it('Should change main page title from English to Russian', () => {
    cy.visit('/');
    cy.contains('h1', 'An expense tracker you deserve!');
    cy.get('.header nav .dropdown .trigger').click();
    cy.get('.header nav .dropdown .menu li:nth-child(2)').click();
    cy.contains('h1', 'Контроль расходов, который вы заслужили!');
  });

  it('Should change login page title from English to Russian', () => {
    cy.visit('/login');
    cy.contains('h1', 'Log In');
    cy.get('.header nav .dropdown .trigger').click();
    cy.get('.header nav .dropdown .menu li:nth-child(2)').click();
    cy.contains('h1', 'Вход');
  });

  it('Should change Sign Up page title from English to Russian', () => {
    cy.visit('/signup');
    cy.contains('h1', 'Sign Up');
    cy.get('.header nav .dropdown .trigger').click();
    cy.get('.header nav .dropdown .menu li:nth-child(2)').click();
    cy.contains('h1', 'Регистрация');
  });
});
