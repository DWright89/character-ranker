class ReviewSerializer {
  static validateReview(review) {
    const checkedReview = review.match(/[a-zA-Z0-9.,?!: ]*/)
    if (checkedReview[0] === review) {
      return true
    } else {
      return false
    }
  }
}

export default ReviewSerializer