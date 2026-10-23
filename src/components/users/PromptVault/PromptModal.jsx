import React, { useState } from 'react'
import PromptInfoCard from './PromptInfoCard'

const difficultyColor = (level) => {
  if (level === "Beginner") return "success";
  if (level === "Intermediate") return "warning";
  if (level === "Advanced") return "danger";
  return "secondary";
}

const PromptModal = ({ prompt, categoryName, onClose }) => {

  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  function handleCopy() {
    navigator.clipboard.writeText(prompt.fullPromptText || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt.fullPromptText || "")}`;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ background: "rgba(2, 6, 23, 0.75)", backdropFilter: "blur(6px)", zIndex: 1055, overflowY: "auto" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4 p-md-5 position-relative"
        style={{ width: "min(90vw, 900px)", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
          <div>
            <div className="mb-2">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill me-2">
                {categoryName || "Uncategorized"}
              </span>
              <span className={`badge bg-${difficultyColor(prompt.Difficulty)}-subtle text-${difficultyColor(prompt.Difficulty)} border border-${difficultyColor(prompt.Difficulty)}-subtle rounded-pill`}>
                {prompt.Difficulty}
              </span>
            </div>
            <h3 className="mb-1">{prompt.title}</h3>
            <p className="text-muted mb-0">{prompt.shortDescription}</p>
          </div>
          <button type="button" className="btn-close flex-shrink-0" onClick={onClose}></button>
        </div>

        {/* Info grid */}
        <div className="row g-3 mb-4">
          <PromptInfoCard icon="🎯" title="Best For" content={prompt.bestFor} />
          <PromptInfoCard icon="🛠" title="When To Use" content={prompt.whenToUse} />
          <PromptInfoCard icon="📦" title="Expected Output" content={prompt.expectedOutput} />
          <PromptInfoCard icon="💡" title="Best Way To Use" content={prompt.bestWayToUse} />
        </div>

        {/* Prompt text */}
        <div className="position-relative mb-3">
          <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
            <a
              href={chatGptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-light"
            >
              Open in ChatGPT
            </a>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="bg-dark text-light rounded-3 p-5 mb-0" style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
            {prompt.fullPromptText}
          </pre>
        </div>

        <div className="text-end">
          <button className="btn btn-primary px-4" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromptModal