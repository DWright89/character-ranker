import React, { useState, useEffect } from "react"

import CharacterTile from "./CharacterTile"

const CharacterList = (props) => {
  const [characters, setCharacters] = useState([])


  const getCharacters = async () => {
    try {
      const response = await fetch("/api/v1/characters")
      if (!response.ok) {
        const errorMessage = `${response.status}(${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      setCharacters(body.characters)
    } catch (error) {
      console.error("Error in CharacterList Fetch", error)
    }
  }

  const charactersArray = characters.map((character) => {
    return (
      <CharacterTile
        key={character.id}
        character={character}
      />
    )
  })

  useEffect(() => {
    getCharacters()
  }, [])

  return (
    <div className="grid-x grid-margin-x">
      <div className="cell small-2 medium-3"/>
      <div className="cell small-8 medium-6">
        <div className="index">
          <h1 className="centered title">Character Ranker</h1>
          <ol>
            {charactersArray}
          </ol>
        </div>
      <div className="cell small-2 medium-3"/>
      </div>
    </div>
  )
}

export default CharacterList