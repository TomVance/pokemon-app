import React from 'react'

import { PokemonData } from '~/lib/services/pokeapi'

interface PokemonCardProps {
  pokemon: PokemonData
  translatedContent: string
  isLoading: boolean
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  translatedContent,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="pokemon-card">
        <div className="pokemon-card__img pokemon-card__img--loading">
          <p>?</p>
        </div>
        <h1 className="h1">...</h1>

        <p className="pokemon-card__description"></p>
      </div>
    )
  }

  return (
    <div className="pokemon-card">
      <div className="pokemon-card__img">
        <img src={pokemon.sprites.front_default} />
      </div>
      <h1 className="h1">{pokemon.name}</h1>

      <p className="pokemon-card__description">{translatedContent}</p>
    </div>
  )
}
