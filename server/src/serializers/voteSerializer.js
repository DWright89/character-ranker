class VoteSerializer {
  static getDetails(voteArray, userId) {
    let output = {
      voted: false,
      sum: 0
    }

    voteArray.forEach(vote => {
      output.sum += vote.voteValue
      if (vote.userId === userId) {
        output.voted = vote.voteValue
      }
    })
    return output
  }

  static voteCount(voteArray) {
    let sum = 0
    voteArray.forEach(vote => {
      sum += vote.voteValue
    })
    return sum
  }
}

export default VoteSerializer