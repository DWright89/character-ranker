import React, { useState } from "react"

import ErrorList from "../layout/ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const NewCharacterForm = props => {
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    gameTitle: '',
    gameSeries: '',
    pictureUrl: '',
    description: ''
  })

  const [errors, setErrors] = useState([])

  const handleInputChange = event => {
    setNewCharacter({
      ...newCharacter,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setNewCharacter({
      name: '',
      gameTitle: '',
      gameSeries: '',
      pictureUrl: '',
      description: ''
    })
  }

  const submitForm = async (formData) => {
    try {
      const response = await fetch("/api/v1/characters", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      }
      else {
        const body = await response.json()
        const destinationId = body.character.id
        console.log("body", body)
        console.log("destination id", destinationId)
        location.href = `/characters/${destinationId}`
      }

    } catch (error) {
      console.error("The form broke", error)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log("submit worked")
    if (!newCharacter.pictureUrl.endsWith(".jpg") && (!newCharacter.pictureUrl.endsWith(".png"))) {
      setErrors(["Requires valid URL"])
    } else {
      submitForm(newCharacter)
      console.log(errors)
      if (errors === []) {
        clearForm()
      }
    }
  }
   
  return (
    <div className='grid-x grid-margin-x centered'>
      <div className='cell small-4 medium-3' />
      <div className='cell small-4 medium-6'>
        <div className='formErrors'>
          <ErrorList errors={errors} />
        </div>
        <div className='newForm'>
          <h1 className='centered title'>Add a new character</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name: *</label>
            <input
              className='input green'
              type='text'
              name='name'
              id='name'
              onChange={handleInputChange}
              value={newCharacter.name}
              />
            <label htmlFor='gameTitle'>Game Title:</label>
            <input
              className='input blue'
              type='text'
              name='gameTitle'
              id='gameTitle'
              onChange={handleInputChange}
              value={newCharacter.gameTitle}
            />
            <label htmlFor='gameSeries'>Game Series: *</label>
            <input
              className='input yellow'
              type='text'
              name='gameSeries'
              id='gameSeries'
              onChange={handleInputChange}
              value={newCharacter.gameSeries}
            />
            <label htmlFor='pictureUrl'>Add a link to a photo:</label>
            <input
              className='input red'
              type='text'
              name='pictureUrl'
              id='pictureUrl'
              onChange={handleInputChange}
              value={newCharacter.pictureUrl}
            />
            <label htmlFor='description'>Why is this character the greatest?</label>
            <textarea
              className='input dark-gray'
              name='description'
              id='description'
              onChange={handleInputChange}
              value={newCharacter.description}
            />
            <input type='submit' className='submit' />
          </form>
        </div>
      </div>
    <div className='cell small-4 medium-3' />
    </div>
  )
}

export default NewCharacterForm