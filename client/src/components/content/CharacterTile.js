
import React from "react"
import {Link} from "react-router-dom"
const CharacterTile = props => {
    const id = props.character.id
    debugger
    return <div>
        <Link 
            to={`characters/${id}`}>
                <li>{props.character.name}</li>
        </Link>
    </div>
}

export default CharacterTile


