import { Server } from "socket.io"
import User from "../models/user.call"
import Call from "../models/call.model"

export const initSocket = (io: Server) => {

  io.on("connection", async (socket) => {

    const userId = socket.handshake.auth.userId

    if (!userId) return

    await User.findByIdAndUpdate(userId, {
      socketId: socket.id
    })

    console.log("User connected")

    socket.on("call-user", async ({ to, offer }) => {

      const receiver = await User.findById(to)

      if (!receiver || !receiver.socketId) {
        socket.emit("user-offline")
        return
      }

      await Call.create({
        caller: userId,
        receiver: to,
        startedAt: new Date()
      })

      io.to(receiver.socketId).emit("incoming-call", {
        from: userId,
        offer
      })

    })

    socket.on("answer-call", async ({ to, answer }) => {

      const caller = await User.findById(to)

      if (!caller?.socketId) return

      io.to(caller.socketId).emit("call-answered", answer)

    })

    socket.on("disconnect", async () => {

      await User.findOneAndUpdate(
        { socketId: socket.id },
        { socketId: null }
      )

    })

  })

}