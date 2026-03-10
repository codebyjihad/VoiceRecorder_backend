import mongoose, { Schema, Document } from 'mongoose';

export interface ICall extends Document {
  caller: string;
  time: Date;
  duration: number;
}

const CallSchema: Schema = new Schema(
  {
    caller: { type: String, required: true },
    time: { type: Date, required: true },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICall>('Call', CallSchema);