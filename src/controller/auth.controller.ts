import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { User } from "../models/user.call"
import { generateToken } from "../utils/generateToken"

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashed,
  })

  res.json({
    user,
    token: generateToken(user._id.toString()),
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: "User not found" })
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return res.status(400).json({ message: "Invalid password" })
  }

  res.json({
    user,
    token: generateToken(user._id.toString()),
  })
}