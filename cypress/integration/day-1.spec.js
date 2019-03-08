/// <reference types="Cypress" />

describe('Day 1', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe(`User story: Application name and purpose`, () => {
    it('has title and content', () => {
      cy.get('.Title')
        .should('have.text', 'Spaced repetition')
        .get('.Description')
        .should('have.text', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.')
    })
  })

  describe(`User story: Create an account`, () => {
    it('directs me to the registration page', () => {
      cy.get('.RegistrationPage')
        .should('be.visible')
    })

    it(`displays the name, username and password fields`, () => {
      cy.get('.RegistrationForm').within(() => {
        cy.get('.RegistrationForm__name-input')
          .find('label')
          .should('have.attr', 'for', 'registration-name-input')
          .should('have.text', 'Enter your name')
          .siblings('input')
          .should('have.attr', 'id', 'registration-name-input')
          .should('have.attr', 'type', 'text')

        cy.get('.RegistrationForm__username-input')
          .find('label')
          .should('have.attr', 'for', 'registration-username-input')
          .should('have.text', 'Enter your username')
          .siblings('input')
          .should('have.attr', 'id', 'registration-username-input')
          .should('have.attr', 'type', 'text')

        cy.get('.RegistrationForm__password-input')
          .find('label')
          .should('have.attr', 'for', 'registration-password-input')
          .should('have.text', 'Enter your password')
          .siblings('input')
          .should('have.attr', 'id', 'registration-password-input')
          .should('have.attr', 'type', 'password')
      })
    })

    context(`Given invalid information`, () => {
      it(`POSTS to the /api/users endpoint with my details`, () => {
        const newUser = {
          name: 'Test name',
          username: 'test-username',
          password: '2-short',
        }
        cy.get('.RegistrationForm').within(() => {
          cy.get('#registration-name-input')
            .type(newUser.name)
          cy.get('#registration-username-input')
            .type(newUser.username)
          cy.get('#registration-password-input')
            .type(newUser.password)
        })
      })
    })
  })
})
