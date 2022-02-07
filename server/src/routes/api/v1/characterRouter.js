import express from "express"

import characterVoteRouter from "./characterVoteRouter.js"
import { Character, Vote } from "../../../models/index.js"

const characterRouter = new express.Router()

characterRouter.get("/", async (req, res) => {
  try {
    const characters = await Character.query()
    return res.status(200).json({ characters })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

characterRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const character = await Character.query().findById(id)
    character.votes = await Vote.query().where("characterId", "=", id).sum("voteValue")
    if (req.user) {
      const userVote = await Vote.query().where("characterId", "=", id).where("userId", "=", req.user.id)
      if (userVote[0]) {
        character.voted = userVote[0].voteValue
      }
    } else {
      character.voted = false
    }
    return res.status(200).json({ character })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

characterRouter.use('/:id/vote', characterVoteRouter)

export default characterRouter