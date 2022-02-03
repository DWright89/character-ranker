
import React from "react"

const VoteButton = (props => {

  return (
    <div>
      <p>You voted: {props.userVote}</p>
      <button className="upvote" name="upvote" value="1" onClick={props.click}>Upvote!</button>
      <button className="downvote" name="downvote" value="-1" onClick={props.click}>Downvote!</button>
    </div>
  )


})

export default VoteButton