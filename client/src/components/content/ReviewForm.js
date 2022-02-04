import React, { useState } from "react"

import ErrorList from "../layout/ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"


const ReviewForm = props => {
  const [newReview,setNewReview] = useState("")
  const [errors, setErrors] = useState([])

  const addNewReview = async() => {
    
  }

  const handleInputChange = event => {
    setNewReview(event.currentTarget.value)
  }

  const clearForm = () => {
    setNewReview("")
  }

  return (
    <div className="reviewForm">
      <div className="formErrors">
        <ErrorList errors={errors} />
      </div>
      <form>
        <label htmlFor="content">Add your arguments for or against this character:</label>
        <textarea name="content" id="content" maxLength="500" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default ReviewForm