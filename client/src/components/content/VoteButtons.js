
import React from "react"

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
      <button className={`fas fa-arrow-up fa-5x ${up}`} name="upvote" value="1" onClick={props.addVote}></button>
      <button className={`fas fa-arrow-down fa-5x ${down}`} name="downvote" value="-1" onClick={props.addVote}></button>
    </div>
  )
})

export default VoteButton