import { element } from "prop-types"
import React, { useEffect } from "react"

import ReviewTile from "./ReviewTile"

const ReviewList = (props) => {

  useEffect (() => {
    props.getReviews()
  }, [])

  const reviewTiles = props.reviews.map((element) => {
    return <ReviewTile review={element} key={element.id}  />
  })
    
  return (
    <div className="reviewList">
      <h4>See what other people have to say:</h4>
      <ul>
        {reviewTiles}
      </ul>
    </div>
  )
}

export default ReviewList