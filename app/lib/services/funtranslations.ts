/**
 * A simple axios wrapper around the fun translations api making it easier to
 * fetch data
 */

import axios from 'axios'

import type { FunTranslations } from '~/types/FunTranslations'

import { isAxiosError } from './helpers'

export const funtranslations = axios.create({
  baseURL: 'https://api.funtranslations.com/translate',
})

export async function fetchTranslationForPhrase(
  phrase: string,
  translation = 'shakespeare',
): Promise<string> {
  try {
    const results = await funtranslations.get<FunTranslations.Translate>(
      `${translation}.json`,
      {
        // The API appears to blow up if we seen new line chars so lits strip them out for the request
        params: { text: phrase.replaceAll('\n', ' ') },
      },
    )

    return results.data.contents.translated
  } catch (err) {
    if (isAxiosError(err)) {
      // We have pretty low rate limits on the translations API so its likely
      // we'll hit this limit. If we do we don't want the app to fail. So lets
      // catch it and return the untranslated text.
      if (err.response?.status === 429) {
        console.warn('Fun translations rate limit hit')

        return phrase
      }
    }

    // Rethrow the error allowing the caller to make a more specific choice on how to handle it
    throw err
  }
}
