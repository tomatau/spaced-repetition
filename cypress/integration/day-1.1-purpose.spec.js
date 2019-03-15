/// <reference types="Cypress" />

describe('Day 1 - Application purpose', () => {
  /**
   * @abstract: know the name and the purpose of app
   *
   * @criteria
    When I visit the the spaced repetition site, I see the name of the learning app, and a brief description.
  */
  describe(`User story: Application name and purpose`, () => {
    it('has h1 with title', () => {
      cy.visit('/')
      cy.get('header h1')
        .should('have.text', 'Spaced repetition ')
    })
  })
})
