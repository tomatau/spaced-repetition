import * as helpers from './helpers'

Cypress.Commands.add('login', (options = {}) => {
  cy.window()
    .then(win => {
      win.localStorage.setItem(
        Cypress.env('TOKEN_KEY'),
        helpers.makeLoginToken(),
      )
    })
})
