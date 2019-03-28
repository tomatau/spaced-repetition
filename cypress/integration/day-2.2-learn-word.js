/// <reference types="Cypress" />

describe(`Day 2 - Learn words`, () => {
  /**
   * @abstract:Learn the meaning of the word
   *
   * @criteria
      On the next word to learn page for a language:
      - I am presented with a word to learn
      - My score is always displayed
      - I am given an input box to type the meaning of the word
      - I am given a submit button to submit my answer
  */
  describe(`User story: Presented with word`, () => {
    beforeEach(() => {
      cy.server()
        .route({
          method: 'GET',
          url: `/api/language/head`,
          status: 200,
          response: 'fixture:language-head.json',
        })
        .as('languageHeadRequest')

      cy.login()
        .visit(`/learn`)
        .wait('@languageHeadRequest')
    })

    it('displays the current score and h2 with next word', () => {
      cy.fixture('language-head.json').then(languageHeadFixture => {
        cy.get('main').within($main => {
          cy.get('p').eq(0)
            .should(
              'have.text',
              `Your total score is: ${languageHeadFixture.totalScore}`,
            )
          cy.get('h2')
            .should('have.text', 'Translate the word:')
            .siblings('span')
            .should('have.text', languageHeadFixture.nextWord)
        })
      })
    })

    it(`displays a form for submitting the next guess`, () => {
      cy.get('main form').within($form => {
        cy.get('label[for=learn-guess-input]')
          .should('have.text', `What's the translation for this word?`)

        cy.get('input#learn-guess-input')
          .should('have.attr', 'type', 'text')
          .and('have.attr', 'required', 'required')

        cy.get('button[type=submit]')
          .should('have.text', 'Submit your answer')
      })
    })

    it(`displays footer with correct and incorrect count`, () => {
      cy.fixture('language-head.json').then(languageHeadFixture => {
        cy.get('main footer').within($footer => {
          cy.root()
            .should(
              'contain',
              `You have answered this word correctly ${languageHeadFixture.wordCorrectCount} times.`,
            )
            .and(
              'contain',
              `You have answered this word incorrectly ${languageHeadFixture.wordIncorrectCount} times.`,
            )
        })
      })
    })
  })

  /**
   * @abstract:Feedback to my answer
   *
   * @criteria
      On the next word to learn page for a language:
      - I can submit my answer
      - After submitting, I get feedback whether i was correct
      - After submitting, I get feedback about the correct answer
      - My score is always displayed
  */
  describe(`User story: Answer feedback`, () => {
    beforeEach(() => {
      cy.server()
        .route({
          method: 'GET',
          url: `/api/language/head`,
          status: 200,
          response: 'fixture:language-head.json',
        })
        .as('languageHeadRequest')
    })

    context(`Given I submit my answer`, () => {
      beforeEach(() => {
        cy.route({
          method: 'POST',
          url: `/api/language/guess`,
          status: 200,
          response: 'fixture:language-guess-generic.json',
        })
          .as('postListGuess')
      })

      it(`submits my answer typed in the form`, () => {
        const guess = 'my-test-guess'

        cy.login().visit(`/learn`)
        cy.wait('@languageHeadRequest')

        cy.get('main form').within($form => {
          cy.get('input#learn-guess-input')
            // .scrollIntoView()
            .type(guess)

          cy.get('button').click()

          cy.wait('@postListGuess')
            .then(xhr => {
              expect(xhr.request.body).to.eql({ guess })
            })
        })
      })
    })

    context(`Given guess is incorrect`, () => {
      const guess = 'test-guess-incorrect'

      beforeEach(() => {
        cy.route({
          method: 'POST',
          url: `/api/language/guess`,
          status: 200,
          response: 'fixture:language-guess-incorrect.json',
        })
          .as('postListGuessIncorrect')

        cy.login().visit(`/learn`).wait('@languageHeadRequest')
        cy.get('input#learn-guess-input').type(guess)
        cy.get('form').submit().wait('@postListGuessIncorrect')
      })

      it(`displays score and feedback the word was incorrect`, () => {
        //  cypress fixtures has buggy behaviour, this works around it o_O
        const fixtures = []
        Cypress.Promise.all([
          cy.fixture('language-head.json').then(fx => fixtures.push(fx)),
          cy.fixture('language-guess-incorrect.json').then(fx => fixtures.push(fx)),
        ]).then(() => {
          const [languageHeadFixture, incorrectFixture] = fixtures

          cy.get('main').within($main => {
            cy.get('.DisplayScore p')
              .should(
                'have.text',
                `Your total score is: ${incorrectFixture.totalScore}`,
              )
            cy.get('h2')
              .should(
                'have.text',
                `Good try, but not quite right :(`,
              )
            cy.get('.DisplayFeedback p')
              .should(
                'have.text',
                `The correct translation for ${languageHeadFixture.nextWord} was ${incorrectFixture.answer} and you chose ${guess}!`,
              )
            cy.get('button')
              .should(
                'have.text',
                `Try another word!`,
              )
          })
        })
      })
    })

    context(`Given guess is correct`, () => {
      const guess = 'test-guess-incorrect'

      beforeEach(() => {
        cy.route({
          method: 'POST',
          url: `/api/language/guess`,
          status: 200,
          response: 'fixture:language-guess-correct.json',
        })
          .as('postListGuessCorrect')

        cy.login().visit(`/learn`).wait('@languageHeadRequest')
        cy.get('input#learn-guess-input').type(guess)
        cy.get('form').submit().wait('@postListGuessCorrect')
      })

      it(`gives feedback the word was correct`, () => {
        //  cypress fixtures has buggy behaviour, this works around it o_O
        const fixtures = []
        Cypress.Promise.all([
          cy.fixture('language-head.json').then(fx => fixtures.push(fx)),
          cy.fixture('language-guess-correct.json').then(fx => fixtures.push(fx)),
        ]).then(() => {
          const [languageHeadFixture, incorrectFixture] = fixtures

          cy.get('main').within($main => {
            cy.get('.DisplayScore p')
              .should(
                'have.text',
                `Your total score is: ${incorrectFixture.totalScore}`,
              )
            cy.get('h2')
              .should(
                'have.text',
                `You were correct! :D`,
              )
            cy.get('.DisplayFeedback p')
              .should(
                'have.text',
                `The correct translation for ${languageHeadFixture.nextWord} was ${incorrectFixture.answer} and you chose ${guess}!`,
              )
            cy.get('button')
              .should(
                'have.text',
                `Try another word!`,
              )
          })
        })
      })
    })
  })

  /**
   * @abstract:See button for next word
   *
   * @criteria
      On the next word to learn page for a language:
      - I can see a button for the next word
      - I can click a button to go to the next word to learn
  */
  describe(`User story: Go to next word`, () => {
    beforeEach(() => {
      cy.server()
        .route({
          method: 'GET',
          url: `/api/language/head`,
          status: 200,
          response: 'fixture:language-head.json',
        })
        .as('languageHeadRequest')
        .route({
          method: 'POST',
          url: `/api/language/guess`,
          status: 200,
          response: 'fixture:language-guess-generic.json',
        })
        .as('postListGuess')

      cy.login().visit(`/learn`).wait('@languageHeadRequest')
      cy.get('input#learn-guess-input').type('anything')
      cy.get('form').submit().wait('@postListGuess')
    })

    it(`displays another word after clicking the 'next' button`, () => {
      cy.get('main button').click()

      cy.fixture('language-guess-generic.json').then(languageHeadFixture => {
        cy.get('main').within($main => {
          cy.get('p').eq(0)
            .should(
              'have.text',
              `Your total score is: ${languageHeadFixture.totalScore}`,
            )
          cy.get('h2')
            .should('have.text', 'Translate the word:')
            .siblings('span')
            .should('have.text', languageHeadFixture.nextWord)
        })
      })

      cy.get('main form').within($form => {
        cy.get('label[for=learn-guess-input]')
          .should('have.text', `What's the translation for this word?`)

        cy.get('input#learn-guess-input')
          .should('have.attr', 'type', 'text')
          .and('have.attr', 'required', 'required')

        cy.get('button[type=submit]')
          .should('have.text', 'Submit your answer')
      })
    })
  })
})
