/*import "cypress-localstorage-commands";

Cypress.Commands.add('login', () => { 
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/users/login',
    body: {
      user: {
        email: 'jake@jake.jake',
        password: 'jakejake',
      }
    }
  })
  .its('body')
  .then(body => {
    cy.setLocalStorage("jwt", body.user.token);
  })
});*/
