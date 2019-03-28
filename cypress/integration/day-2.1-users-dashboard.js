/// <reference types="Cypress" />

describe(`Day 2 - User's dashboard`, () => {
  /**
   * @abstract:??
   *
   * @criteria
      On the default page:
      - ?
  */
  describe(`User story: Presented with language`, () => {
    beforeEach(() => {
      cy.server()
        .route({
          method: 'GET',
          url: '/api/language',
          status: 200,
          response: 'fixture:language',
        })
        .as('languageRequest')
    })

    beforeEach(() => {
      cy.login().visit('/')
    })

    it('has h2 with title, total score, subtitle and link', () => {
      cy.fixture('language.json').then(({ language }) => {
        cy.get('main section').within($section => {
          cy.get('h2')
            .should('contain', language.name)

          cy.root()
            .should(
              'contain',
              `Total correct answers: ${language.total_score}`,
            )

          cy.get('a')
            .should('have.attr', 'href', '/learn')
            .and('have.text', 'Start practicing')

          cy.get('h3')
            .should('have.text', 'Words to practice')
        })
      })
    })

    it(`shows an LI and link for each language`, () => {
      cy.wait('@languageRequest')
      cy.fixture('language.json').then(({ words }) => {
        words.forEach((word, idx) => {
          cy.get('main section li').eq(idx).within($li => {
            cy.get('h4').should('have.text', word.translation)
            cy.root()
              .should('contain', `correct answer count: ${word.correct_count}`)
            cy.root()
              .should('contain', `incorrect answer count: ${word.incorrect_count}`)
          })
        })
      })
    })
  })
})
