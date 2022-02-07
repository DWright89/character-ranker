import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Vote } from "../../../models/index.js"

const characterVotesRouter = new express.Router({ mergeParams: true })

characterVotesRouter.post("/", async (req, res) => {
  const { voteValue } = req.body
  const userId = req.user.id
  const characterId = req.params.id
  const vote = { characterId, userId, voteValue }
  const findUserVote = await Vote.query().where("userId", "=", userId).where("characterId", "=", characterId)
  const userVote = findUserVote[0]
  try {
    if (userVote) {
      if (userVote.voteValue === voteValue) {
        const deletedVote = await Vote.query().deleteById(userVote.id)
        return res.status(202).json({ deletedVote })
      } else {
        const updatedVote = await Vote.query().patchAndFetchById(userVote.id, { voteValue })
        return res.status(201).json({ updatedVote })
      }
    } 
    const newVote = await Vote.query().insertAndFetch(vote)
    return res.status(200).json({ newVote })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default characterVotesRouter