import React, {useState, useEffect} from "react"

const CharacterShow = (props) =>{
    const [character, setCharacter] = useState({})
    
    const getCharacter = async () =>{
        const characterId = props.match.params.id
        try {
            const response = await fetch(`/api/v1/characters/${characterId}`)
            if (!response.ok){
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            setCharacter(body.character)
            
        }catch(error){
            console.error("error in character show", error.Message)
        }
    }
   useEffect (()=>{
       getCharacter()
   }, [])

   debugger


    return(
        <div>
            <h2>{character.name}</h2>
            <h4>Appearing in: {character.gameTitle} </h4>
            <h3>From the bestselling series {character.gameSeries} </h3>
            <p>Description: {character.description}</p>
            <img src={character.pictureUrl}
            width="400" 
            height="500"></img>
        </div>
    )
}

export default CharacterShow