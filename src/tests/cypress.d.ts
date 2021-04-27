declare namespace Cypress {
  interface Chainable {
    register(): Chainable<Element>,
    login(): Chainable<Element>,
    logout(): Chainable<Element>,
    removeUser(): Chainable<Element>,
    addCategory(): Chainable<Element>,
  }
}
