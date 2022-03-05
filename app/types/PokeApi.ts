/**
 * A partial set of typings for the PokeAPI. This file only contains types for
 * the attributes used within this application
 */
export namespace PokeAPI {
  interface FlavourText {
    flavour_text: string
    language: {
      name: string
    }
    version: {
      name: string
    }
  }

  export interface PokemonSpecies {
    id: number
    name: string
    flavor_text_entries: FlavourText[]
  }

  export interface Pokemon {
    id: number
    sprites: Record<string, string>
  }
}
