import express from "express";

import { Vote } from "../../../models/index.js"

const voteRouter = new express.Router()

voteRouter.post("/", async (req, res)=>{
  try {
    const newVote = await Vote.query().insertAndFetch(req.body)
    return res.status(201).json({ newVote })
  }catch(error){
    return res.status(500).json({ errors: error })
  }
})


export default voteRouter