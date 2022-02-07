import express from "express"
import { ValidationError } from "objection"

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const characterReviewRouter = new express.Router({ mergeParams: true })

characterReviewRouter.get("/", async (req,res) => {
  const characterId = req.params.id
  try {
    const reviews = await Review.query().where("characterId", "=", characterId).select("content", "id", "createdAt")
    return res.status(200).json({ reviews })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

characterReviewRouter.post("/", async (req,res) => {
  const cleanForm = cleanUserInput(req.body)
  try{
    const newReview = await Review.query().insertAndFetch(cleanForm)
    return res.status(201).json({ review: newReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default characterReviewRouter