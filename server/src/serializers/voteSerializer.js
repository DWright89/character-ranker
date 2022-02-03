class voteSerializer {
  static cleanVotes(vote) {
    const allowedAttributes = ["userId", "voteValue"]
    let cleanedVote = {}
    for (const attribute of allowedAttributes) {
      cleanedVote[attribute] = vote[attribute]
    }
    return cleanedVote
  }
}

export default voteSerializer