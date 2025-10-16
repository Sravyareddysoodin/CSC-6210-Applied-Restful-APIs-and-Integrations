import { NextResponse } from "next/server"

// In-memory storage (shared with main route)
// This would be replaced with actual database queries
const books = []

// Helper to get books from the main route
async function getBooks() {
  // In a real app, this would query the database
  // For now, we'll use a module-level variable
  return books
}

// GET single book
export async function GET(request, { params }) {
  const { id } = await params
  const allBooks = await getBooks()
  const book = allBooks.find((b) => b._id === id)

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}

// PUT update book
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const allBooks = await getBooks()
    const bookIndex = allBooks.findIndex((b) => b._id === id)

    if (bookIndex === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    const updatedBook = {
      ...allBooks[bookIndex],
      title: body.title || allBooks[bookIndex].title,
      author: body.author || allBooks[bookIndex].author,
      genre: body.genre || allBooks[bookIndex].genre,
      status: body.status || allBooks[bookIndex].status,
      coverImage: body.coverImage !== undefined ? body.coverImage : allBooks[bookIndex].coverImage,
    }

    allBooks[bookIndex] = updatedBook
    return NextResponse.json(updatedBook)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

// DELETE book
export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const allBooks = await getBooks()
    const bookIndex = allBooks.findIndex((b) => b._id === id)

    if (bookIndex === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 })
    }

    allBooks.splice(bookIndex, 1)
    return NextResponse.json({ message: "Book deleted successfully" })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
