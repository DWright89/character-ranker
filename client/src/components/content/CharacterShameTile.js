import React from "react"
import { Link } from "react-router-dom"

const CharacterShameTile = props => {
  const { id } = props.character

  return (
    <div className="shameTile centered">
      <h2>SHAME ZONE</h2>
      <h4>#1 Loser</h4>
      <Link to={`/characters/${id}`}>
        <p>{props.character.name} - Total votes: {props.character.sum}</p>
        <div className="shame centered">
          <img className="loser" src={props.character.pictureUrl}/>
          <br />
          <img src="https://i.imgur.com/WCzRK16.jpg"/>
        </div>
      </Link>
    </div>
  )
}

export default CharacterShameTile