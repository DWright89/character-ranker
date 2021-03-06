import express from "express"
import { ValidationError } from "objection"

import characterVotesRouter from "./characterVotesRouter.js"
import characterReviewRouter from "./characterReviewRouter.js"
import { Character, Vote } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import CharacterSerializer from "../../../serializers/CharacterSerializer.js"

const characterRouter = new express.Router()

characterRouter.get("/", async (req, res) => {
  try {
    const characters = await Character.query()
    const serializedCharacters = await CharacterSerializer.getRanked(characters)
    return res.status(200).json({ characters: serializedCharacters })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

characterRouter.get("/all", async (req, res) => {
  try {
    const characters = await Character.query()
    const serializedCharacters = await CharacterSerializer.getSummary(characters)
    return res.status(200).json({ characters: serializedCharacters })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

characterRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const character = await Character.query().findById(id)
    const serializedCharacter = await CharacterSerializer.getDetails(character, req.user)
    return res.status(200).json({ character: serializedCharacter })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

characterRouter.post("/", async (req, res) => {
  const { body } = req
  const validatedCharacter = CharacterSerializer.validateCharacter(body)
  if (!validatedCharacter) {
    return res.status(423).json({ errors: "Bad character input detected." })
  } else {
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
  }
})

characterRouter.use("/:id/reviews", characterReviewRouter)
characterRouter.use('/:id/votes', characterVotesRouter)

export default characterRouter