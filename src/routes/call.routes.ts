import express from "express"
import {
  startCall,
  endCall,
  callHistory,
} from "../controller/call.controller"

const router = express.Router()

router.post("/start", startCall)

router.post("/end", endCall)

router.get("/history/:userId", callHistory)

export default router