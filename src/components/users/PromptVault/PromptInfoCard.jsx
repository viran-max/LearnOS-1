import React from 'react'

const PromptInfoCard = ({ title, content }) => {
  if (!content) return null;

  return (
    <div className="col-md-6">
      <div className="border rounded-3 p-3 h-100">
        <div className="d-flex align-items-center mb-2">
          <h6 className="mb-0 fw-bold">{title}</h6>
        </div>
        <p className="text-muted mb-0 small">{content}</p>
      </div>
    </div>
  )
}

export default PromptInfoCard