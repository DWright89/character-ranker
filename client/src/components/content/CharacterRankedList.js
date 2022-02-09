import React, { useState, useEffect } from "react"

import CharacterTile from "./CharacterTile"
import CharacterShameTile from "./CharacterShameTile"

const CharacterRankedList = (props) => {
  const [topFive, setTopFive] = useState([])
  const [shame, setShame] = useState({})

  const getCharacters = async () => {
    try {
      const response = await fetch("/api/v1/characters")
      if (!response.ok) {
        const errorMessage = `${response.status}(${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      setTopFive(body.characters.topFiveCharacters)
      setShame(body.characters.bottomCharacter)
    } catch (error) {
      console.error("Error in CharacterRankedList Fetch", error)
    }
  }

  const topFiveArray = topFive.map((character) => {
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
      <div className="cell small-2 medium-3" />
      <div className="cell small-8 medium-6">
        <div className="index">
          <h1 className="centered title">Character Ranker</h1>
          <ol>
            {topFiveArray}
          </ol>
          <CharacterShameTile character={shame} />
        </div>
        <div className="cell small-2 medium-3" />
      </div>
    </div>
  )
}

export default CharacterRankedList