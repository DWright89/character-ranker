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
    <div className="index">
      <h1 className="title">Character Ranker</h1>
      <ol className="rankings">
        {charactersArray}
      </ol>
    </div>
  )
}

export default CharacterList