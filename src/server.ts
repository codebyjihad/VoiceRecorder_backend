import http from "http"
import { Server } from "socket.io"
import app from "./app"
import { initSocket } from "./socket/socket"
import { connectDB } from "./config/db"

connectDB()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

initSocket(io)

server.listen(5000, () => {
  console.log("Server running on port 5000")
})