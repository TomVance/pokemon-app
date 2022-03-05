/**
 * A simple axios wrapper around the pokiAPI making it easier to fetch data
 */

import axios from 'axios'

import type { PokeAPI } from '~/types/PokeApi'

export const pokeapi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
})

interface PokemonData {
  name: string
  /**
   * Flavour text represents the pokemons description for the given _flavour_
   * (version) of pokemon. for example "red", "emerald", etc...
   */
  flavourText: PokeAPI.PokemonSpecies['flavor_text_entries'][number]
  sprites: string[]
}

/**
 * We have to make a couple of calls to the pokeapi to fetch all of the
 * information we're going to need to make this easier lets provide a utility
 * method to collate it.
 */
export async function fetchPokemonByName(
  name: string,
  flavour = 'red',
): Promise<PokemonData> {
  const { data: pokemonData } = await pokeapi.get<PokeAPI.Pokemon>(
    `pokemon/${name}`,
  )
  const sprites = Object.values(pokemonData.sprites)

  const { data: speciesData } = await pokeapi.get<PokeAPI.PokemonSpecies>(
    `pokemon-species/${pokemonData.id}`,
  )

  const flavourTextForRequestedFlavour = speciesData.flavor_text_entries.find(
    ({ version }) => {
      return version.name === flavour
    },
  )

  /**
   * If a flavour text cannot be found for the provided flavour lets return the
   * first entry and log an error.
   *
   * Its likely that the caller will want some response here
   */
  if (!flavourTextForRequestedFlavour) {
    console.log('Flavour not found')

    return {
      name,
      flavourText: speciesData.flavor_text_entries[0],
      sprites,
    }
  }

  return {
    name,
    flavourText: flavourTextForRequestedFlavour,
    sprites,
  }
}
