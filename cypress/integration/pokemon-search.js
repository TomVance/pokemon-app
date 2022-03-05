describe('Can search for a pokemon', () => {
  it('displays an empty search state', () => {
    cy.visit('/')
    cy.get('.search-form__input').should('contain', '')
  })

  describe('when searching for a pokemon', () => {
    describe('when the pokemons name is invalid', () => {
      it('should show an error', () => {
        cy.intercept(
          {
            method: 'GET',
            url: 'http://localhost:3000/?q=fake+name*',
          },
          {
            state: 'error',
            message: 'Unable to find pokemon',
          },
        ).as('searchUrl')

        cy.visit('/')
        cy.get('.search-form__input').type('fake name')
        cy.get('form').submit()
        cy.wait('@searchUrl')

        cy.get('h1').should('contain', 'Uh Oh!')
      })
    })

    describe('when the pokemons name is valid', () => {
      it('should show the pokemon result', () => {
        cy.intercept(
          {
            method: 'GET',
            url: 'http://localhost:3000/?q=charizard*',
          },
          {
            pokemon: {
              name: 'charizard',
              flavourText: {
                flavor_text:
                  'Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.',
                language: {
                  name: 'en',
                },
                version: {
                  name: 'red',
                },
              },
              sprites: [
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
              ],
            },
            translation:
              'Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.',
            state: 'success',
          },
        ).as('searchUrl')

        cy.get('.search-form__input').clear()
        cy.get('.search-form__input').type('charizard')
        cy.get('form').submit()
        cy.wait('@searchUrl')

        cy.get('h1').should('contain', 'charizard')
        cy.get('p').should(
          'contain',
          'Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally',
        )
      })
    })
  })
})
