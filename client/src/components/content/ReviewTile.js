import React from "react"

const ReviewTile = props => {

  return (
    <li className="reviewTile">
      {props.review.content}
    </li>
  )

}

export default ReviewTile