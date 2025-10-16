"use client"

import { useState, useEffect } from "react"

function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    status: "To Read",
    coverImage: "",
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        status: book.status,
        coverImage: book.coverImage || "",
      })
    }
  }, [book])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.author || !formData.genre) {
      alert("Please fill in all required fields")
      return
    }

    if (book) {
      onSubmit(book._id, formData)
    } else {
      onSubmit(formData)
    }

    setFormData({
      title: "",
      author: "",
      genre: "",
      status: "To Read",
      coverImage: "",
    })
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? "Edit Book" : "Add New Book"}</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="genre">Genre *</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Enter genre"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="coverImage">Cover Image URL (optional)</label>
        <input
          type="url"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="https://example.com/cover.jpg"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {book ? "Update Book" : "Add Book"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default BookForm
