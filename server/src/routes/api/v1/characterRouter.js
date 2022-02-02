import express from "express"

import { Character } from "../../../models/index.js"

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

export default characterRouter