import mongoose from "mongoose";

type CallBookingDocumentT = mongoose.Document & CallBookingT;

const schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    handler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETE", "UNCOMPLETE"],
      default: "PENDING",
    },
    message: { type: String, required: true },
    recipientLine: { type: String, required: true },
    callOn: { type: Date, required: true },
    remark: String,
  },
  { timestamps: true }
);

export default (mongoose.models
  .CallBooking as mongoose.Model<CallBookingDocumentT>) ||
  mongoose.model<CallBookingDocumentT>("CallBooking", schema);
