"use client"

function Filter({ selectedStatus, onStatusChange }) {
  const statuses = ["All", "To Read", "Reading", "Completed"]

  return (
    <div className="filter">
      <label>Filter by Status:</label>
      <div className="filter-buttons">
        {statuses.map((status) => (
          <button
            key={status}
            className={`filter-btn ${selectedStatus === status ? "active" : ""}`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter
