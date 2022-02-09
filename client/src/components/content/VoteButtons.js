import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"

const VoteButton = (props => {

  let up = ""
  let down = ""
  if (props.userVote === 1) {
    up = "upvote"
  } if (props.userVote === -1) {
    down = "downvote"
  }

  return (
    <div>
      <button name="upvote" value="1" onClick={props.addVote}>
        <FontAwesomeIcon className={`fas fa-5x ${up}`} icon={faArrowUp} />
      </button>
      <button name="downvote" value="-1" onClick={props.addVote}>
        <FontAwesomeIcon className={`fas fa-arrow-down fa-5x ${down}`} icon={faArrowDown} />
      </button>
    </div>
  )
})

export default VoteButton