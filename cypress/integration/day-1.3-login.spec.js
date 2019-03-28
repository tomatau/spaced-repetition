/// <reference types="Cypress" />
import * as helpers from '../support/helpers'

describe('Day 1 - Login', function() {
  /**
   * @abstract: Login
   *
   * @criteria
      On any visit, I should be able to go to a login page
      - I can enter my username and password
      - If my username and password is correct then the app should accept them and greet me with a message
      - "Hello MY_NAME"
      - If my username and password are incorrect then the app should  alert a meaningful message so I can try to login again
  */
  describe(`User story: Login`, () => {
    it(`has navigation to login page in nav and form`, () => {
      cy.visit('/')

      cy.get('header nav').within($nav => {
        cy.get('a[href="/login"]')
          .should('be.visible')
          .and('have.text', 'Login')
      })

      cy.get('main section').within($nav => {
        cy.get('a[href="/login"]')
          .should('be.visible')
          .and('have.text', 'Already have an account?')
          .click()
          .url().should('eq', `${Cypress.config().baseUrl}/login`)
      })
    })

    it(`allows navigation back to the registration page`, () => {
      cy.visit('/login')
        .get('a[href="/register"]')
        .should('be.visible')
        .and('have.text', 'Sign up')
    })

    it('displays the login page', () => {
      cy.visit('/login')

      cy.get('main section').within($section => {
        cy.get('h2').should(
          'have.text',
          'Login',
        )
      })
    })

    it(`displays the username and password fields`, () => {
      cy.visit('/login')

      cy.get('section form').within(() => {
        cy.get('label[for=login-username-input]')
          .should('have.text', 'Username')
        cy.get('input#login-username-input')
          .should('have.attr', 'type', 'text')
          .and('have.attr', 'required', 'required')

        cy.get('label[for=login-password-input]')
          .should('have.text', 'Password')
        cy.get('input#login-password-input')
          .should('have.attr', 'type', 'password')
          .and('have.attr', 'required', 'required')

        cy.get('button[type=submit]')
          .should('have.text', 'Login')
      })
    })

    context(`Given invalid credentials`, () => {
      beforeEach(() => {
        cy.server()
          .route({
            method: 'POST',
            url: '/api/auth/token',
            status: 400,
            response: {
              error: 'Incorrect username or password'
            },
          })
          .as('loginRequest')
      })

      it(`displays error from POSTS /api/auth/token`, () => {
        const newUser = {
          username: 'invalid-username',
          password: 'invalid-password',
        }
        cy.visit('/login')

        cy.get('main form').within($form => {
          cy.get('#login-username-input')
            .type(newUser.username)
          cy.get('#login-password-input')
            .type(newUser.password)
          cy.root().submit()

          cy.wait('@loginRequest')
            .get('[role=alert]')
            .should('have.text', 'Incorrect username or password')
        })
      })
    })

    context(`Given valid credentials`, () => {
      const loginToken = helpers.makeLoginToken()

      beforeEach(() => {
        cy.server()
          .route({
            method: 'POST',
            url: '/api/auth/token',
            status: 200,
            response: () => ({
              authToken: loginToken
            }),
          })
          .as('loginRequest')
          .route({
            method: 'PUT',
            url: '/api/auth/token',
            status: 200,
            response: () => ({
              authToken: loginToken
            }),
          })
          .as('refreshRequest')
          .route({
            method: 'GET',
            url: '/api/language',
            status: 200,
            response: {
              language: {},
              words: [],
            },
          })
          .as('languageRequest')
      })

      it(`stores token in localStorage and redirects to /`, () => {
        const loginUser = {
          username: 'username',
          password: 'password',
        }
        cy.visit('/login')

        cy.get('main form').within($form => {
          cy.get('#login-username-input')
            .type(loginUser.username)
          cy.get('#login-password-input')
            .type(loginUser.password)
          cy.root().submit()

          cy.wait('@loginRequest')
          cy.window().then((win) => {
            const tokenInStorage = win.localStorage.getItem(Cypress.env('TOKEN_KEY'))
            expect(tokenInStorage).to.eql(loginToken)
          })
          cy.url().should('eq', `${Cypress.config().baseUrl}/`)
        })
      })

      it(`displays my user name and presents the logout button`, () => {
        cy.login().visit('/')

        cy.get('header').within($header => {
          cy.contains('Test name of user').should('exist')
          cy.get('nav a')
            .should('have.length', 1)
            .and('have.text', 'Logout')
            .and('have.attr', 'href', '/')
        })
      })

      it(`keeps refreshing the token before it expires`, () => {
        const loginUser = {
          username: 'username',
          password: 'password',
        }
        cy.clock().visit('/login')

        cy.get('main form').within($form => {
          cy.get('#login-username-input')
            .type(loginUser.username)
          cy.get('#login-password-input')
            .type(loginUser.password)

          cy.root().submit()

          cy.wait('@loginRequest')

          cy.tick(20000).wait('@refreshRequest')
          cy.tick(20000).wait('@refreshRequest')
        })
      })

      it(`doesn't redirect on page load when valid token in localStorage`, () => {
        cy.login()
          .visit('/')
          .url()
          .should('not.contain', `/register`)
          .and('not.contain', `/login`)
      })

      it(`refreshes tokens loaded from localStorage`, () => {
        cy.login().clock().visit('/')
        cy.tick(20000).wait('@refreshRequest')
        cy.tick(20000).wait('@refreshRequest')
      })
    })
  })
})
