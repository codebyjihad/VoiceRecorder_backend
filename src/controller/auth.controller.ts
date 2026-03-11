import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { User } from "../models/user.call"
import { generateToken } from "../utils/generateToken"

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body


    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Send response with JWT
    res.status(201).json({
      user,
      token: generateToken(user._id.toString()),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const match = await bcrypt.compare(password, user.password as string)
    if (!match) {
      return res.status(400).json({ message: "Invalid password" })
    }

    res.json({
      user,
      token: generateToken(user._id.toString()),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}