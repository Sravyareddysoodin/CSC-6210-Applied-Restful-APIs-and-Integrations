import { NextResponse } from "next/server"

// In-memory storage for demo purposes
// In production, this would connect to MongoDB
let books = [
  {
    _id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    status: "Completed",
    coverImage: "/great-gatsby-book-cover.png",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    status: "Reading",
    coverImage: "/1984-book-cover.png",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    status: "To Read",
    coverImage: "/to-kill-a-mockingbird-cover.png",
    createdAt: new Date().toISOString(),
  },
]

let nextId = 4

// GET all books
export async function GET() {
  return NextResponse.json(books)
}

// POST new book
export async function POST(request) {
  try {
    const body = await request.json()
    const newBook = {
      _id: String(nextId++),
      title: body.title,
      author: body.author,
      genre: body.genre,
      status: body.status || "To Read",
      coverImage: body.coverImage || "",
      createdAt: new Date().toISOString(),
    }
    books = [newBook, ...books]
    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
