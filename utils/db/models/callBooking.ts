import mongoose from "mongoose";

type CallBookingDocumentT = mongoose.Document & CallBookingT;

const schema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    serviceStatus: {
      type: String,
      enum: ["PENDING", "COMPLETE", "UNCOMPLETE"],
      default: "PENDING",
    },
    message: { type: String, required: true },
    recipientLine: { type: String, required: true },
    callOn: { type: Date, required: true },
    serviceRemark: String,
  },
  { timestamps: true }
);

export default (mongoose.models
  .CallBooking as mongoose.Model<CallBookingDocumentT>) ||
  mongoose.model<CallBookingDocumentT>("CallBooking", schema);
