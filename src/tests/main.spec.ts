describe('Main', () => {
  xit('should display header text', () => {
    cy.visit('/');
    cy.contains('h1', 'An expense tracker you deserve!');
  });
});
