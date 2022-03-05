import React from 'react'
import { LoaderFunction, useLoaderData, useSearchParams } from 'remix'

import { PokemonCard } from '~/lib/components/pokemon-card/PokemonCard'
import { SearchForm } from '~/lib/components/search-form/SearchForm'
import { logger } from '~/lib/logger'
import { fetchTranslationForPhrase } from '~/lib/services/funtranslations'
import { isAxiosError } from '~/lib/services/helpers'
import { fetchPokemonByName, PokemonData } from '~/lib/services/pokeapi'

interface SuccessState {
  state: 'success'
  pokemon: PokemonData
  translation: string
}

interface ErrorState {
  state: 'error'
  status: number
  message: string
}

interface PendingState {
  state: 'pending'
}

/**
 * Represents the different states that the UI can be in:
 *
 * - **success**: We have successfully found a pokemon and have returned its
 *   data
 * - **error**: Something went wrong searching for the pokemon, includes a
 *   message with more details
 * - **pending**: We're waiting for input from the user to search for a pokemon
 **/
type LoaderData = SuccessState | ErrorState | PendingState

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const requestUrl = new URL(request.url)
  const pokemonName = requestUrl.searchParams.get('q')

  if (pokemonName) {
    try {
      const pokemonData = await fetchPokemonByName(
        pokemonName,
        // Optionally pass in the requested flavour, will default to 'red' if is undefined
        requestUrl.searchParams.get('flavour') ?? undefined,
      )

      const translatedFlavourContent = await fetchTranslationForPhrase(
        pokemonData.flavourText.flavor_text,
      )

      return {
        pokemon: pokemonData,
        translation: translatedFlavourContent,
        state: 'success',
      }
    } catch (err) {
      if (isAxiosError(err)) {
        logger.error({ err, term: pokemonName }, 'Failed to fetch pokemon data')

        return {
          status: err.response?.status ?? 500,
          state: 'error',
          message: `We where unable to find a pokemon with the name ${pokemonName}. Please check your spelling and try again.`,
        }
      }

      logger.error(
        { err, term: pokemonName },
        'Unexpected error when loading pokemon app',
      )
      return {
        status: 500,
        state: 'error',
        message: `Something went wrong...`,
      }
    }
  }

  // If a search has not happened, we can return an empty set of props
  // to the UI.
  return {
    state: 'pending',
  }
}

const Index: React.FC = () => {
  const props = useLoaderData<LoaderData>()
  const [searchParams] = useSearchParams()

  if (props.state === 'error') {
    return (
      <div className="wrapper">
        <SearchForm query={searchParams.get('q')} />

        <div className="error">
          <h1 className="h1 h1--error">Uh Oh!</h1>
          <p>{props.message}</p>
        </div>
      </div>
    )
  }

  if (props.state === 'success') {
    return (
      <div className="wrapper">
        <SearchForm query={searchParams.get('q')} />
        <PokemonCard
          pokemon={props.pokemon}
          translatedContent={props.translation}
        />
      </div>
    )
  }

  return (
    <div className="wrapper">
      <SearchForm query={searchParams.get('q')} />
    </div>
  )
}

export default Index
