import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import VoteButtons from "./VoteButtons.js"

const CharacterShow = (props) => {
  const [character, setCharacter] = useState({})
  const [totalVotes, setTotalVotes] = useState(0)
  const [userVote, setUserVote] = useState(false)
  const [clicked, setClicked] = useState(0)
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
      setTotalVotes(body.character.votes[0].sum)
      setUserVote(body.character.voted)
    } catch (error) {
      console.error("error in character show", error.Message)
    }
  }

 

  useEffect(() => {
    getCharacter()
  }, [clicked])

  const addVote = async (event) => {
    event.persist();
    const newVote = {
      voteValue: parseInt(event.currentTarget.value)
    }
    const characterId = params.id
    try {
      await fetch(`/api/v1/characters/${characterId}/vote`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newVote)
      })
      setClicked((clicked + 1))
    } catch (error) {
      console.error("Error in voting button ", error)
    }
  }

  let voteButtons = <p>Log in to vote!</p>
  if(props.user){
    voteButtons = <VoteButtons
      addVote={addVote}
      userVote={userVote}
      />
  }

  return (
    <div>
      <h2 className='characterName'>
        {character.name}
      </h2>
      <img
        src={character.pictureUrl}
        width="400"
        height="500"
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