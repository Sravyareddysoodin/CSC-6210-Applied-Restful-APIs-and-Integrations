import express from "express"
import { Book } from "../db.js"

const router = express.Router()

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 })
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST new book
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    status: req.body.status || "To Read",
    coverImage: req.body.coverImage || "",
  })

  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    book.title = req.body.title || book.title
    book.author = req.body.author || book.author
    book.genre = req.body.genre || book.genre
    book.status = req.body.status || book.status
    book.coverImage = req.body.coverImage !== undefined ? req.body.coverImage : book.coverImage

    const updatedBook = await book.save()
    res.json(updatedBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    await book.deleteOne()
    res.json({ message: "Book deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
