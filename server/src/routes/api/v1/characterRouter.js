import express from "express"

import { Character } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

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
  try{
    const character = await Character.query().findById(req.params.id)
    return res.status(200).json({ character })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

characterRouter.post("/", async (req, res) => {
  const { body } = req
  const cleanForm = cleanUserInput(body);
  try {
    const newCharacter = await Character.query().insertAndFetch(cleanForm)
    return res.status(201).json({ character: newCharacter });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    console.error("Error in the character post router", error)
    return res.status(500).json({ errors: error })
  }
})

export default characterRouter