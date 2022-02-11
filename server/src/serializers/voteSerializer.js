import { Vote } from "../../src/models/index.js"

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

  static checkVote(vote) {
    if (vote === 1 || vote === -1) {
      return vote
    }
    else {
      return false
    }
  }

  static async handleUserVote(value, userId, characterId) {
    if (value === false) {
      return "You are entering an illegal vote."
    }
    const votedAlready = await Vote.query().where("userId", "=", userId).where("characterId", "=", characterId)

    if (votedAlready[0]) {
      const existingVote = votedAlready[0].value
      if (value == existingVote) {
        const deletedVote = await Vote.query().deleteById(votedAlready[0].id)
        return deletedVote
      } else {
        const updatedVote = await Vote.query().patchAndFetchById(votedAlready[0].id, { value })
        return updatedVote
      }
    } else {
      const vote = { userId, characterId, value }
      const newVote = await Vote.query().insertAndFetch(vote)
      return newVote
    }
  }
}

export default VoteSerializer