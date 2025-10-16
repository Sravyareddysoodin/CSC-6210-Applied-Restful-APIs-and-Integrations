import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["To Read", "Reading", "Completed"],
      default: "To Read",
    },
    coverImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

export const Book = mongoose.model("Book", bookSchema)
export default connectDB
