import express from "express";

import { Vote, User } from "../../../models/index.js"

const voteRouter = new express.Router()

voteRouter.post("/", async (req, res)=>{
  const { characterId, userId, voteValue } = req.body
  const vote = { characterId, userId, voteValue }
  try {if(!req.body.votedAlready){
    const newVote = await Vote.query().insertAndFetch(vote)
    return res.status(201).json({ newVote })
  }
  else {
    const currentUser = await User.query().findById(userId)
    const relatedVote = await currentUser.$relatedQuery('votes').where("characterId", "=", characterId)
    const targetId = relatedVote[0].id
    const updatedVote = await Vote.query().patchAndFetchById(targetId, { voteValue })
    // await Vote.query().patchAndFetch({ voteValue}).findOne({ userId, characterId })
    return res.status(202).json({ updatedVote })
  }
  }catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})
export default voteRouter