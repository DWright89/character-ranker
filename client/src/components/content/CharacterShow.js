import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import ReviewForm from "./ReviewForm"
import ReviewList from "./ReviewList"

const CharacterShow = (props) => {
  const params = useParams()
  const [character, setCharacter] = useState({})
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
    } catch (error) {
      console.error("error in character show", error.Message)
    }
  }

  useEffect(() => {
    getCharacter()
  }, [])

  let reviewForm = <p>You must be signed in to leave a review</p>
  if (props.user) {
    reviewForm = <ReviewForm
      characterId={character.id}
      userId={props.user.id}
      getReviews={getReviews}
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
      {reviewForm}
      <ReviewList characterId={params.id} getReviews={getReviews} reviews={reviews} />
    </div>
  )
}

export default CharacterShow