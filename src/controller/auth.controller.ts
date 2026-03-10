import { Request, Response } from "express"
import  bcrypt from "bcrypt"
import User from "../models/User"
import { generateToken } from "../utils/jwt"

export const register = async (req: Request, res: Response) => {

  const { name, email, password } = req.body

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hash
  })

  const token = generateToken(user._id.toString())

  res.json({
    token,
    user
  })
}

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return res.status(401).json({
      message: "Wrong password"
    })
  }

  const token = generateToken(user._id.toString())

  res.json({
    token,
    user
  })
}