import React from 'react'

import { PokemonData } from '~/lib/services/pokeapi'

interface PokemonCardProps {
  pokemon: PokemonData
  translatedContent: string
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  translatedContent,
}) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card__img">
        <img src={pokemon.sprites[0]} />
      </div>
      <h1 className="h1">{pokemon.name}</h1>

      <p>{translatedContent}</p>
    </div>
  )
}
