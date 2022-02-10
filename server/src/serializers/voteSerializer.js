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
    console.log("in vote checker, ", vote)
    if (vote === 1 || vote === -1){
      console.log("Good vote detected")
      return vote
    }
    else {
      console.log("Bad vote detected")
      return false
    }
  }

  static async handleUserVote(value, userId, characterId) {
    if (value === false){
      return "You are entering an illegal vote."
    }
    const votedAlready = await Vote.query().where("userId", "=", userId).where("characterId", "=", characterId)
    console.log("Voted Already, ", votedAlready)

    if(votedAlready[0]){ //this means it found your vote
      const  existingVote  = votedAlready[0].value
      console.log("Existing vote: ", existingVote)
      if(value == existingVote){
        console.log("Voted already user Id", votedAlready[0].userId)
        const deletedVote = await Vote.query().deleteById(votedAlready[0].id)
        console.log("Deleted vote: ", deletedVote)
        return deletedVote
      } else {
        console.log("Voted already user Id", votedAlready[0].userId)
        const updatedVote = await Vote.query().patchAndFetchById(votedAlready[0].id, { value })
        console.log("Updated vote: ", updatedVote)
        return updatedVote
      }
    }else{
    const vote = {userId, characterId, value}
    const newVote = await Vote.query().insertAndFetch(vote)
    return newVote
    }
  }
}

export default VoteSerializer