import mongoose from "mongoose";

type MemberDocumentT = mongoose.Document & MemberT

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      match: /.+\@.+\..+/,
      required: [true, "Email is required"],
      lowercase: true,
    },
    hashedPassword: { type: String, required: [true, "Password is required"] },
    salt: { type: String, required: [true, "Salt is required"] },
    role: {
      type: String,
      default: "CUSTOMER",
      enum: ["ADMIN", "OPERATOR", "CUSTOMER"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      maxlength: 30,
      trim: true,
    },
  },
  { timestamps: true }
);

export default (mongoose.models.Member as mongoose.Model<MemberDocumentT>) ||
  mongoose.model<MemberDocumentT>("Member", schema);
