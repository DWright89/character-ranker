import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import VoteButtons from "./VoteButtons.js"

const CharacterShow = (props) => {
  const [character, setCharacter] = useState({})
  const [totalVotes, setTotalVotes] = useState(0)
  const [userVote, setUserVote] = useState(false)
  const params = useParams()

  const getCharacter = async () => {
    const characterId = params.id
    try {
      const response = await fetch(`/api/v1/characters/${characterId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      setCharacter(body.character)
      setTotalVotes(body.character.sum)
      setUserVote(body.character.voted)
    } catch (error) {
      console.error("error in character show", error.Message)
    }
  }

  const addVote = async (event) => {
    const newVote = {
      value: parseInt(event.currentTarget.value)
    }
    const characterId = params.id
    try {
      const response = await fetch(`/api/v1/characters/${characterId}/votes`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newVote)
      })
      const returnedVote = await response.json()
      setUserVote(returnedVote.value)
    } catch (error) {
      console.error("Error in voting button ", error)
    }
  }
  
  let voteButtons = <Link to="/user-sessions/new"><p>Log in to vote!</p></Link>
  if (props.user) {
    voteButtons = <VoteButtons
    addVote={addVote}
    userVote={userVote}
    />
  }
  
  useEffect(() => {
    getCharacter()
  }, [userVote])
  
  return (
    <div>
      <h2 className='characterName'>
        {character.name}
      </h2>
      <img className="characterImage"
        src={character.pictureUrl}
      />
      <h4 className='gameTitle'>
        Appearing in: {character.gameTitle}
      </h4>
      <h3 className='gameSeries'>
        From the bestselling series {character.gameSeries}
      </h3>
      <p className='arguments'>
        Description: {character.description}
      </p>
      <p>Total Points: {totalVotes}</p>
      {voteButtons}
    </div>
  )
}

export default CharacterShow