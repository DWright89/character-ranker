import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import VoteButtons from "./VoteButtons.js"
import ReviewForm from "./ReviewForm.js"
import ReviewList from "./ReviewList.js"


const CharacterShow = (props) => {
  const params = useParams()
  const [character, setCharacter] = useState({})
  const [totalVotes, setTotalVotes] = useState(0)
  const [userVote, setUserVote] = useState(false)
  const [reviews, setReviews] = useState([])

  const getReviews = async () => {
    try {
      const characterId = params.id
      const response = await fetch(`/api/v1/characters/${characterId}/reviews`)
      if (!response.ok) {
        const errorMessage = `${response.status}(${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      setReviews(body.reviews)
    } catch (error) {
      console.error("Error in Fetch", error)
    }
  }

  const getCharacter = async () => {
    try {
      const characterId = params.id
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

  let reviewForm = <p>You must be signed in to leave a review</p>
  if (props.user) {
    reviewForm = <ReviewForm
      reviews={reviews}
      setReviews={setReviews}
      characterId={params.id}
    />
  }


  useEffect(() => {
    getCharacter()
  }, [userVote])

  return (
    <div className="grid-x grid-margin-x">
      <div className="cell small-2 medium-3" />
      <div className="cell small-8 medium-6">
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
        {reviewForm}
        <ReviewList characterId={params.id} getReviews={getReviews} reviews={reviews} />
        <div className="cell small-2 medium-3" />
      </div>
    </div>
  )
}

export default CharacterShow