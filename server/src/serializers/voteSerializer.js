class VoteSerializer {
  static getDetails(voteArray, currentUser) {
    let output = {
      voted: false,
      sum: 0
    }

    voteArray.forEach(vote => {
      output.sum += vote.value
      if (vote.userId === currentUser?.id) {
        output.voted = vote.value
      }
    })
    return output
  }

  static voteCount(voteArray) {
    let sum = 0
    voteArray.forEach(vote => {
      sum += vote.value
    })
    return sum
  }
}

export default VoteSerializer