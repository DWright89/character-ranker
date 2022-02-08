import React from "react"
import { Link } from "react-router-dom"

const CharacterTile = props => {
  const { id } = props.character

  return (
    <Link to={`characters/${id}`}>
      <li>{props.character.name} - Total votes: {props.character.sum}</li>
    </Link>
  )
}

export default CharacterTile