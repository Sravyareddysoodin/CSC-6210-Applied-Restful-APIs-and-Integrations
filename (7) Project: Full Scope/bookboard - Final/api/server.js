import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js"
import booksRouter from "./routes/books.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Routes
app.use("/api/books", booksRouter)

app.get("/", (req, res) => {
  res.json({ message: "BookBoard API is running" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
