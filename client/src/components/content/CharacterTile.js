import React from "react"
import { Link } from "react-router-dom"

const CharacterTile = props => {
  const id = props.character.id

  return (
    <Link 
      to={`characters/${id}`}>
        <li>{props.character.name}</li>
    </Link>
  )
}

export default CharacterTile


