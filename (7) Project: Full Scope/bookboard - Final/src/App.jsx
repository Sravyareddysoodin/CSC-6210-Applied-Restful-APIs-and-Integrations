"use client"

import { useState, useEffect } from "react"
import { Toaster, toast } from "sonner"
import BookCard from "./components/BookCard"
import BookForm from "./components/BookForm"
import Filter from "./components/Filter"
import Pagination from "./components/Pagination"

export default function BookBoardApp() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [editingBook, setEditingBook] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 6

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter((book) => book.status === selectedStatus))
    }
    setCurrentPage(1)
  }, [books, selectedStatus])

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books")
      const data = await response.json()
      setBooks(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching books:", error)
      toast.error("Failed to load books")
      setLoading(false)
    }
  }

  const handleAddBook = async (bookData) => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })
      const newBook = await response.json()
      setBooks([newBook, ...books])
      setShowForm(false)
      toast.success("Book added successfully!")
    } catch (error) {
      console.error("Error adding book:", error)
      toast.error("Failed to add book")
    }
  }

  const handleUpdateBook = async (id, bookData) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })
      const updatedBook = await response.json()
      setBooks(books.map((book) => (book._id === id ? updatedBook : book)))
      setEditingBook(null)
      setShowForm(false)
      toast.success("Book updated successfully!")
    } catch (error) {
      console.error("Error updating book:", error)
      toast.error("Failed to update book")
    }
  }

  const handleDeleteBook = async (id) => {
    try {
      await fetch(`/api/books/${id}`, {
        method: "DELETE",
      })
      setBooks(books.filter((book) => book._id !== id))
      toast.success("Book deleted successfully!")
    } catch (error) {
      console.error("Error deleting book:", error)
      toast.error("Failed to delete book")
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

  return (
    <div className="app">
      <Toaster position="top-right" richColors closeButton />
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">
            <svg
              className="title-icon"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            BookBoard
          </h1>
          <p className="app-subtitle">Your Personal Library Manager</p>
        </div>
      </header>
      <main className="main-content">
        <div className="controls">
          <Filter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Book"}
          </button>
        </div>
        {showForm && (
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            onCancel={handleCancelForm}
          />
        )}
        {loading ? (
          <div className="loading">Loading books...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="empty-state">
            <p>No books found. Start by adding your first book!</p>
          </div>
        ) : (
          <>
            <div className="books-grid">
              {currentBooks.map((book) => (
                <BookCard key={book._id} book={book} onEdit={handleEdit} onDelete={handleDeleteBook} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </main>
    </div>
  )
}
