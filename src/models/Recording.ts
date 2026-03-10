import mongoose from "mongoose"

const recordingSchema = new mongoose.Schema({
  callId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Call"
  },

  fileUrl: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Recording", recordingSchema)