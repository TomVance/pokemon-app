import expect from 'expect'
import nock from 'nock'

import { fetchTranslationForPhrase } from '../funtranslations'

describe('FunTranslations', () => {
  describe('fetchTranslationForPhrase', () => {
    let phrase: string

    beforeEach(() => {
      phrase =
        'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.'
    })

    describe('when we hit the api rate limit', () => {
      beforeEach(() => {
        nock('https://api.funtranslations.com')
          .get(`/translate/shakespeare.json?text=${phrase}`)
          .reply(429)
      })

      it('returns the requested phrase as the translated text', async () => {
        expect(await fetchTranslationForPhrase(phrase)).toEqual(phrase)
      })
    })

    describe('when we get a translation', () => {
      beforeEach(() => {
        nock('https://api.funtranslations.com')
          .get(`/translate/shakespeare.json?text=${phrase}`)
          .reply(200, {
            contents: {
              translated: 'Shakespeare translation',
            },
          })
      })

      it('returns the requested phrase as the translated text', async () => {
        expect(await fetchTranslationForPhrase(phrase)).toEqual(
          'Shakespeare translation',
        )
      })
    })

    describe('when passing a translation type', () => {
      beforeEach(() => {
        nock('https://api.funtranslations.com')
          .get(`/translate/pirate.json?text=${phrase}`)
          .reply(200, {
            contents: {
              translated: 'Pirate translation',
            },
          })
      })

      it('requests a translation for that type', async () => {
        expect(await fetchTranslationForPhrase(phrase, 'pirate')).toEqual(
          'Pirate translation',
        )
      })
    })
  })
})
