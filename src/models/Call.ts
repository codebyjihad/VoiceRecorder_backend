import mongoose from "mongoose"

const callSchema = new mongoose.Schema({
  caller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  startedAt: Date,
  endedAt: Date
})

export default mongoose.model("Call", callSchema)