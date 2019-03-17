/// <reference types="Cypress" />

describe(`Day 2 - User's lists`, () => {
  /**
   * @abstract:??
   *
   * @criteria
      On the default page:
      - ?
  */
  describe(`User story: Presented with language lists`, () => {
    beforeEach(() => {
      cy.server()
        .route({
          method: 'GET',
          url: '/api/list',
          status: 200,
          response: 'fixture:lists',
        })
        .as('listRequest')
    })

    beforeEach(() => {
      cy.login().visit('/')
    })

    it('has h2 with title', () => {
      cy.get('main section').within($section => {
        cy.get('h2')
          .should('have.text', 'Your languages')
          .siblings('p')
          .should(
            'have.text',
            'Choose a language to practice using spaced repetition from the options below.'
          )
      })
    })

    it(`shows an LI and link for each language`, () => {
      cy.wait('@listRequest')
      cy.fixture('lists.json').each((list, idx) => {
        cy.get('main section li').eq(idx).within($section => {
          cy.get('a').should('have.attr', 'href', `/list/${list.id}`)
          cy.get('h3').should('have.text', list.name)
          cy.get('span').should('have.text', `Current score: ${list.score}`)
        })
      })
    })
  })
})
