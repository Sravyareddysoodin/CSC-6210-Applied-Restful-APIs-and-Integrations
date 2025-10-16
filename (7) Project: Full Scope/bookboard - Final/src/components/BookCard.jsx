"use client"

import { useState } from "react"
import ConfirmModal from "./ConfirmModal"

function BookCard({ book, onEdit, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const getStatusClass = (status) => {
    switch (status) {
      case "To Read":
        return "status-to-read"
      case "Reading":
        return "status-reading"
      case "Completed":
        return "status-completed"
      default:
        return ""
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    onDelete(book._id)
    setShowDeleteModal(false)
  }

  return (
    <>
      <div className="book-card">
        {book.coverImage && (
          <div className="book-cover">
            <img src={book.coverImage || "/placeholder.svg"} alt={book.title} />
          </div>
        )}
        <div className="book-content">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <p className="book-genre">{book.genre}</p>
          <span className={`book-status ${getStatusClass(book.status)}`}>{book.status}</span>
        </div>
        <div className="book-actions">
          <button className="btn btn-edit" onClick={() => onEdit(book)}>
            Edit
          </button>
          <button className="btn btn-delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
      />


    </>
  )
}

export default BookCard
