import express from "express"

import { Character, Vote } from "../../../models/index.js"

const characterRouter = new express.Router()

characterRouter.get("/", async (req,res) => {
  try {
    const characters = await Character.query()
    return res.status(200).json({ characters })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

characterRouter.get("/:id", async (req,res) => {
  const userId = req.user.id
  const id = req.params.id
  try{
    const character = await Character.query().findById(id)
    character.votes = await Vote.query().where("characterId", "=", id).sum("voteValue")
    character.voted = Boolean((await Vote.query().where("characterId", "=", id).where("userId", "=", userId))[0])
    return res.status(200).json({ character })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

export default characterRouter