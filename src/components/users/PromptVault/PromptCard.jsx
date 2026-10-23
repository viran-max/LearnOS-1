import React from 'react'

const difficultyColor = (level) => {
  if (level === "Beginner") return "success";
  if (level === "Intermediate") return "warning";
  if (level === "Advanced") return "danger";
  return "secondary";
}

const PromptCard = ({ prompt, categoryName, onOpen }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div
        className="border rounded-4 p-4 h-100 bg-white"
        style={{ cursor: "pointer" }}
        onClick={() => onOpen(prompt)}
      >
        <div className="mb-3">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill me-2">
            {categoryName || "Uncategorized"}
          </span>
          <span className={`badge bg-${difficultyColor(prompt.Difficulty)}-subtle text-${difficultyColor(prompt.Difficulty)} border border-${difficultyColor(prompt.Difficulty)}-subtle rounded-pill`}>
            {prompt.Difficulty}
          </span>
        </div>

        <h5 className="mb-2">{prompt.title}</h5>
        <p className="text-muted mb-3">{prompt.shortDescription}</p>

        <button className="btn btn-sm btn-outline-primary">
          View Prompt
        </button>
      </div>
    </div>
  )
}

export default PromptCard