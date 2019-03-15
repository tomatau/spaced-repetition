/// <reference types="Cypress" />

describe('Day 1 - Registration', () => {
  /**
   * @abstract: Create an account
   *
   * @criteria
      On my first visit
      - I should be directed to a registration page.
      - On that page, I can enter my name, username, and password
      - If all information is correct, upon clicking the submit button, I should be taken to a login page
      - If the information is incorrect, I should be given proper error messages and option to enter the correct information
  */
  describe(`User story: Register an account`, () => {
    it('on first load, directs me to the registration page', () => {
      cy.visit('/')

      cy.get('main section').within($section => {
        cy.get('h2')
          .should('have.text', 'Sign up')
          .get('p')
          .should(
            'have.text',
            'Practice learning a language with the spaced reptition revision technique.'
          )
      })
    })

    it(`displays the name, username and password fields`, () => {
      cy.visit('/')

      cy.get('section form').within(() => {
        cy.get('label[for=registration-name-input]')
          .should('have.text', 'Enter your name*')
        cy.get('input#registration-name-input')
          .should('have.attr', 'type', 'text')
          .and('have.attr', 'required', 'required')

        cy.get('label[for=registration-username-input]')
          .should('have.text', 'Choose a username*')
        cy.get('input#registration-username-input')
          .should('have.attr', 'type', 'text')
          .and('have.attr', 'required', 'required')

        cy.get('label[for=registration-password-input]')
          .should('have.text', 'Choose a password*')
        cy.get('input#registration-password-input')
          .should('have.attr', 'type', 'password')
          .and('have.attr', 'required', 'required')

        cy.get('button[type=submit]')
          .should('have.text', 'Sign up')
      })
    })

    context(`Given invalid information`, () => {
      beforeEach(() => {
        cy.server()
          .route({
            method: 'POST',
            url: '/api/user',
            status: 400,
            response: {
              error: 'Some error from the server'
            },
          })
          .as('postRegister')
      })

      it(`displays error from POSTS /api/users`, () => {
        const newUser = {
          name: 'Test name',
          username: 'invalid-username',
          password: 'invalid-password',
        }
        cy.visit('/')

        cy.get('main form').within($form => {
          cy.get('#registration-name-input')
            .type(newUser.name)
          cy.get('#registration-username-input')
            .type(newUser.username)
          cy.get('#registration-password-input')
            .type(newUser.password)
          cy.root().submit()

          cy.wait('@postRegister')
            .get('[role=alert]')
            .should('have.text', 'Some error from the server')
        })
      })
    })

    context(`Given valid information`, () => {
      beforeEach(() => {
        cy.server()
          .route({
            method: 'POST',
            url: '/api/user',
            status: 200,
            response: {},
          })
          .as('postRegister')
      })

      it(`redirects to /login`, () => {
        const newUser = {
          name: 'Test name',
          username: 'test-username',
          password: 'test-password',
        }
        cy.visit('/')

        cy.get('section form').within($form => {
          cy.get('#registration-name-input')
            .type(newUser.name)
          cy.get('#registration-username-input')
            .type(newUser.username)
          cy.get('#registration-password-input')
            .type(newUser.password)
          cy.root().submit()
          cy.wait('@postRegister')
            .url().should('eq', `${Cypress.config().baseUrl}/login`)
        })
      })
    })
  })
})
