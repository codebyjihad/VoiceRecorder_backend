import { Server, Socket } from "socket.io"
import { User } from "../models/user.model"
import { Call } from "../models/call.model"

export const initSocket = (io: Server) => {

  io.on("connection", async (socket: Socket) => {

    const userId = socket.handshake.auth?.userId

    if (!userId) {
      socket.disconnect()
      return
    }

    // save socketId
    await User.findByIdAndUpdate(userId, {
      socketId: socket.id
    })

    console.log("User connected:", userId)

    // CALL USER
    socket.on("call-user", async ({ to, offer }) => {

      const receiver = await User.findById(to)

      if (!receiver || !receiver.socketId) {
        socket.emit("user-offline")
        return
      }

      const call = await Call.create({
        callerId: userId,
        receiverId: to,
        startTime: new Date()
      })

      io.to(receiver.socketId).emit("incoming-call", {
        from: userId,
        offer,
        callId: call._id
      })

    })

    // ANSWER CALL
    socket.on("answer-call", async ({ to, answer }) => {

      const caller = await User.findById(to)

      if (!caller?.socketId) return

      io.to(caller.socketId).emit("call-answered", answer)

    })

    // END CALL
    socket.on("end-call", async ({ callId, to }) => {

      await Call.findByIdAndUpdate(callId, {
        endTime: new Date()
      })

      const otherUser = await User.findById(to)

      if (otherUser?.socketId) {
        io.to(otherUser.socketId).emit("call-ended")
      }

    })

    // DISCONNECT
    socket.on("disconnect", async () => {

      await User.findOneAndUpdate(
        { socketId: socket.id },
        { socketId: null }
      )

      console.log("User disconnected")

    })

  })

}