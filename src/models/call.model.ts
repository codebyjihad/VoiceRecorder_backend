import mongoose from "mongoose"

const callSchema = new mongoose.Schema(
  {
    callerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startTime: Date,

    endTime: Date,

    duration: Number,

    recordingUrl: String,
  },
  { timestamps: true }
)

export const Call = mongoose.model("Call", callSchema)