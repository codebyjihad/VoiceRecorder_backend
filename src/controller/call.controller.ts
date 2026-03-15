import { Request, Response } from "express"
import { Call } from "../models/call.model"

export const startCall = async (req: Request, res: Response) => {
  try {
    const { callerId, receiverId } = req.body

    const call = await Call.create({
      callerId,
      receiverId,
      startTime: new Date(),
    })

    res.json(call)
  } catch (error) {
    res.status(500).json({ message: "Failed to start call" })
  }
}

export const endCall = async (req: Request, res: Response) => {
  try {
    const { callId, recordingUrl } = req.body

    const call = await Call.findById(callId)

    if (!call) {
      return res.status(404).json({ message: "Call not found" })
    }

    if (!call.startTime) {
      return res.status(400).json({ message: "Start time missing" })
    }

    call.endTime = new Date()

    call.duration =
      (call.endTime.getTime() - call.startTime.getTime()) / 1000

    call.recordingUrl = recordingUrl

    await call.save()
   
    res.json(call)
  } catch (error) {
    res.status(500).json({ message: "Failed to end call" })
  }
}

export const callHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const history = await Call.find({
      $or: [{ callerId: userId }, { receiverId: userId }],
    }).populate("callerId receiverId")

    res.json(history)
  } catch (error) {
    res.status(500).json({ message: "Failed to get call history" })
  }
}