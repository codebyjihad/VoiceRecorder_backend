import { Request, Response } from "express"
import { Call } from "../models/call.model"

export const startCall = async (req: Request, res: Response) => {
  const { callerId, receiverId } = req.body

  const call = await Call.create({
    callerId,
    receiverId,
    startTime: new Date(),
  })

  res.json(call)
}

export const endCall = async (req: Request, res: Response) => {
  const { callId, recordingUrl } = req.body

  const call = await Call.findById(callId)

  if (!call) return res.status(404).json({ message: "Call not found" })

  call.endTime = new Date()

  call.duration =
    (call.endTime.getTime() - call.startTime.getTime()) / 1000

  call.recordingUrl = recordingUrl

  await call.save()

  res.json(call)
}

export const callHistory = async (req: Request, res: Response) => {
  const { userId } = req.params

  const history = await Call.find({
    $or: [{ callerId: userId }, { receiverId: userId }],
  })
    .populate("callerId receiverId")

  res.json(history)
}