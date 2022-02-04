
import React from "react"

const VoteButton = (props => {

let voteStatus = ""
if(props.userVote){
  voteStatus = <p>You have voted!</p>
}

  return (
    <div>
      {voteStatus}
      <button className="upvote" name="upvote" value="1" onClick={props.click}>Upvote!</button>
      <button className="downvote" name="downvote" value="-1" onClick={props.click}>Downvote!</button>
    </div>
  )


})

export default VoteButton