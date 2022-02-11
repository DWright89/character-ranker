import express from "express"

import VoteSerializer from "../../../serializers/voteSerializer.js"

const characterVotesRouter = new express.Router({ mergeParams: true })

characterVotesRouter.post("/", async (req, res) => {
  const value = VoteSerializer.checkVote(req.body.value)
  try {
    const vote = await VoteSerializer.handleUserVote(value, req.user.id, req.params.id)
    if (typeof (vote) === 'string') {
      const error = vote
      throw (error)
    } else {
      return res.status(200).json({ vote })
    }
  } catch (error) {
    if (!parseInt(error)) {
      return res.status(423).json({ error })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default characterVotesRouter