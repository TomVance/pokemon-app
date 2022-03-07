import expect from 'expect'
import nock from 'nock'

import { fetchPokemonByName } from '../pokeapi'

describe('Pokeapi', () => {
  describe('fetchPokemonByName', () => {
    let pokemonName: string

    beforeEach(() => {
      pokemonName = 'charizard'
      nock(`https://pokeapi.co`)
        .get(`/api/v2/pokemon/${pokemonName}`)
        .reply(200, {
          id: 1,
          sprites: {
            main_image: 'https://test.img',
          },
        })
    })

    describe('when no flavour text is found for the requested flavour', () => {
      beforeEach(() => {
        nock(`https://pokeapi.co`)
          .get(`/api/v2/pokemon-species/1`)
          .reply(200, {
            id: 1,
            name: pokemonName,
            flavor_text_entries: [
              {
                flavour_text: 'Description for yellow version',
                language: {
                  name: 'en',
                },
                version: {
                  name: 'yellow',
                },
              },
              {
                flavour_text: 'Description for emerald version',
                language: {
                  name: 'en',
                },
                version: {
                  name: 'emerald',
                },
              },
            ],
          })
      })

      it('returns the first flavour text value', async () => {
        expect(await fetchPokemonByName(pokemonName, 'yellow')).toEqual({
          name: 'charizard',
          flavourText: {
            flavour_text: 'Description for yellow version',
            language: {
              name: 'en',
            },
            version: {
              name: 'yellow',
            },
          },
          sprites: {
            main_image: 'https://test.img',
          },
        })
      })
    })

    describe('when no flavour is provided', () => {
      beforeEach(() => {
        nock(`https://pokeapi.co`)
          .get(`/api/v2/pokemon-species/1`)
          .reply(200, {
            id: 1,
            name: pokemonName,
            flavor_text_entries: [
              {
                flavour_text: 'Description for red version',
                language: {
                  name: 'en',
                },
                version: {
                  name: 'red',
                },
              },
              {
                flavour_text: 'Description for emerald version',
                language: {
                  name: 'en',
                },
                version: {
                  name: 'emerald',
                },
              },
            ],
          })
      })

      it('defaults to red', async () => {
        expect(await fetchPokemonByName(pokemonName, 'yellow')).toEqual({
          name: 'charizard',
          flavourText: {
            flavour_text: 'Description for red version',
            language: {
              name: 'en',
            },
            version: {
              name: 'red',
            },
          },
          sprites: {
            main_image: 'https://test.img',
          },
        })
      })
    })
  })
})
