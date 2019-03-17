/// <reference types="Cypress" />

describe(`Day 2 - Learn words`, () => {
  /**
   * @abstract:Learn the meaning of the word
   *
   * @criteria
      On the default page:
      - I am presented with a word to learn
      - I am given an input box to type the meaning of the word
      - I am given a submit button to submit my answer
  */
  describe(`User story: Presented with word`, () => {
    const listId = 1

    beforeEach(() => {
      cy.server()
        .route({
          method: 'GET',
          url: `/api/list/${listId}/head`,
          status: 200,
          response: 'fixture:list-head.json',
        })
        .as('listHeadRequest')
    })

    beforeEach(() => {
      cy.login().visit(`/list/${listId}`)
    })

    it('displays the current score and h2 with next word', () => {
      cy.wait('@listHeadRequest')

      cy.fixture('list-head.json').then(listHeadFixture => {
        cy.get('main').within($section => {
          cy.get('p').eq(0)
            .should(
              'have.text',
              `Your current score is: ${listHeadFixture.listScore}`,
            )
          cy.get('h2')
            .should('have.text', 'Translate the word:')
            .siblings('span')
            .should('have.text', listHeadFixture.nextWord)
        })
      })
    })

    it(`displays a form for submitting the next guess`, () => {
      cy.wait('@listHeadRequest')

      cy.get('main form').within($form => {
        cy.get('label[for=learn-guess-input]')
          .should('have.text', `What's the translation for this word?`)

        cy.get('input#learn-guess-input')
          .should('have.attr', 'type', 'text')
          .and('have.attr', 'required', 'required')

        cy.get('button[type=submit]')
          .should('have.text', 'Submit your translation')
      })
    })
  })
})
