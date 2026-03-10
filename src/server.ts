import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB} from "./config/db"

import authRoutes from "./routes/auth.routes"
import callRoutes from "./routes/call.routes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/call", callRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server running")
})