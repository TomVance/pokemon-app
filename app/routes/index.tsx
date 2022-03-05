import React from 'react'
import { LoaderFunction, useLoaderData } from 'remix'

import { isAxiosError } from '~/lib/services/helpers'
import { fetchPokemonByName, PokemonData } from '~/lib/services/pokeapi'

interface SuccessState {
  state: 'success'
  pokemon: PokemonData
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
 * - **success**: We have successfully found a pokemon and have returned its data
 * - **error**: Something went wrong searching for the pokemon, includes a message with more details
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

      return {
        pokemon: pokemonData,
        state: 'success',
      }
    } catch (err) {
      if (isAxiosError(err)) {
        return {
          status: err.response?.status ?? 500,
          state: 'error',
          message: `We where unable to find a pokemon with the name ${pokemonName}. Please check your spelling and try again.`,
        }
      }

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

  if (props.state === 'error') {
    return (
      <div>
        <h1>Error - {props.status}</h1>
        <p>{props.message}</p>
      </div>
    )
  }

  if (props.state === 'success') {
    return (
      <div>
        <h1>{props.pokemon.name}</h1>
        <img src={props.pokemon.sprites[0]} />
        <p>{props.pokemon.flavourText.flavor_text}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Pokémon Search Engine</h1>
      <form>
        <input type="text" name="q" />
        <button>Search</button>
      </form>
    </div>
  )
}

export default Index
