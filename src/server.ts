import express from 'express'
import { connectDb } from './config/db'
import env from './config/env'
const app = express()

app.use(express.json())

connectDb()

app.get('/' , (req , res) => {
   res.status(201).json({
    message:'Welcome to Callrecorder Server'
   })
})


app.listen(env.PORT , () => {
    console.log(`Server Running On Port ${env.PORT}`)
})

