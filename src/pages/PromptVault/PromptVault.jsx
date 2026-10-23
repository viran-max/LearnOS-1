import React, { useEffect, useState } from 'react'
import promptService from '../../services/promptService'
import promptCategoryService from '../../services/promptCategoryService'
import PromptCard from '../../components/users/PromptVault/PromptCard'
import PromptModal from '../../components/users/PromptVault/PromptModal'

const PromptVault = () => {

  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const categoryData = await promptCategoryService.getAll();
    const publishedCategories = categoryData.filter((cat) => cat.status === "Published");
    setCategories(publishedCategories);

    const promptData = await promptService.getAll();
    setPrompts(promptData);

    setLoading(false);
  }

  function getCategoryName(categoryId) {
    const match = categories.find((cat) => cat.id === categoryId);
    return match ? match.name : "Uncategorized";
  }

  const visiblePrompts = activeCategory === "all"
    ? prompts
    : prompts.filter((prompt) => prompt.category === activeCategory);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Prompt Vault
              </h1>
              <p className="text-white mb-0">
                A curated library of ready-to-use AI prompts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">

          {/* Category filter pills */}
          <div className="d-flex flex-wrap gap-2 mb-5 justify-content-center">
            <button
              className={`btn btn-sm rounded-pill ${activeCategory === "all" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`btn btn-sm rounded-pill ${activeCategory === cat.id ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading &&
            <p className="text-center">Loading prompts...</p>
          }

          {!loading && visiblePrompts.length === 0 &&
            <p className="text-center">No prompts available in this category yet.</p>
          }

          <div className="row g-4">
            {visiblePrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                categoryName={getCategoryName(prompt.category)}
                onOpen={setSelectedPrompt}
              />
            ))}
          </div>

        </div>
      </div>

      <PromptModal
        prompt={selectedPrompt}
        categoryName={selectedPrompt ? getCategoryName(selectedPrompt.category) : ""}
        onClose={() => setSelectedPrompt(null)}
      />
    </>
  )
}

export default PromptVault