import React, { useState } from "react"

import ErrorList from "../layout/ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const ReviewForm = props => {
  const [newReview, setNewReview] = useState('')
  const [errors, setErrors] = useState([])
  const [localErrors, setLocalErrors] = useState('')
  const [reviewLength, setReviewLength] = useState(0)

  const addNewReview = async (event) => {
    event.preventDefault()
    const { characterId } = props
    const reviewBody = {
      content: newReview
    }

    try {
      const response = await fetch(`/api/v1/characters/${characterId}/reviews`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reviewBody)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
        if (response.status === 423) {
          const body = await response.json()
          return setLocalErrors(body.errors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else {
        setErrors([])
        const body = await response.json()
        const newReview = { content: body.review.content, id: body.review.id }
        props.setReviews(props.reviews.concat(newReview))
        setNewReview("")
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleInputChange = event => {
    setNewReview(event.currentTarget.value)
    setReviewLength(newReview.length)
  }

  return (
    <div className="reviewForm">
      <div className="formErrors">
        <ErrorList errors={errors} />
        {localErrors}
      </div>
      <form onSubmit={addNewReview}>
        <label htmlFor="content">Add your arguments for or against this character:</label>
        <textarea
          name="content"
          className="input yellow"
          id="content"
          maxLength={500}
          onChange={handleInputChange}
          value={newReview}
        />
        <input type="submit" className="submit inline" />
        <p className="counter inline">{reviewLength}/500</p>
      </form>
    </div>
  )
}

export default ReviewForm