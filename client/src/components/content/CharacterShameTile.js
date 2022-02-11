import React from "react"
import { Link } from "react-router-dom"

const CharacterShameTile = props => {
  const { id, name, sum, pictureUrl } = props.character

  return (
    <div className="shameTile centered">
      <h2>SHAME ZONE</h2>
      <h4>#1 Loser</h4>
      <Link to={`/characters/${id}`}>
        <p>{name} - Total votes: {sum}</p>
        <div className="shame centered">
          <img className="loser" src={pictureUrl} />
          <br />
          <img src="https://i.imgur.com/WCzRK16.jpg" />
        </div>
      </Link>
    </div>
  )
}

export default CharacterShameTile