import React from "react";
import { useState, useEffect } from "react";

import promptService from "../../../services/promptService";
import promptCategoryService from "../../../services/promptCategoryService";
import cloudinaryService from "../../../services/cloudinaryService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PromptVaultSubNav from "./PromptVaultSubNav";

const PromptEdit = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [bestFor, setBestFor] = useState("");
  const [whenToUse, setWhenToUse] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [bestWayToUse, setBestWayToUse] = useState("");
  const [fullPromptText, setFullPromptText] = useState("");
  const [promptImage, setPromptImage] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const nav = useNavigate();

  const params = useParams();

  async function getCategories() {
    let response = await promptCategoryService.getAll();
    setCategories(response);
  }

  async function updatePrompt(e) {
    e.preventDefault();
    try {
      let imageUrl = currentImageUrl;
      if (promptImage) {
        imageUrl = await cloudinaryService.upload(promptImage);
      }

      let payload = {
        title: title,
        category: category,
        Difficulty: difficulty,
        shortDescription: shortDescription,
        bestFor: bestFor,
        whenToUse: whenToUse,
        expectedOutput: expectedOutput,
        bestWayToUse: bestWayToUse,
        fullPromptText: fullPromptText,
        promptImage: imageUrl,
      };
      console.log(payload);
      await promptService.updatePrompt(payload, params.id);
      nav(-1);
      toast.success("Prompt Updated!");
    } catch (error) {
      toast.error("Error Updating Prompt");
      console.log("Prompt Error : ", err);
    }
  }

  async function getPromptDetails() {
    let response = await promptService.singlePrompt(params.id);

    if (response) {
      setTitle(response.title);
      setCategory(response.category);
      setDifficulty(response.Difficulty);
      setShortDescription(response.shortDescription);
      setBestFor(response.bestFor);
      setWhenToUse(response.whenToUse);
      setExpectedOutput(response.expectedOutput);
      setBestWayToUse(response.bestWayToUse);
      setFullPromptText(response.fullPromptText);
      setCurrentImageUrl(response.promptImage);
    } else {
      alert("Some error occured!");
    }
  }

  useEffect(() => {
    getCategories();
    getPromptDetails();
  }, []);

  return (
    <>
    {/* header  */}
    <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-pencil-square"></i> Edit Prompt</h2>
      <p>Update this prompt's details.</p>
    </div>
    <PromptVaultSubNav />
  </div>
</div>
      {/* Prompt Form  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Edit Prompt
            </h6>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form onSubmit={updatePrompt}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <label htmlFor="title">Title</label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="category">Category</label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => {
                          setDifficulty(e.target.value);
                        }}
                        selected
                      >
                        <option value="">Select Difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      <label htmlFor="Difficulty">Difficulty</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="shortDescription"
                        placeholder="Short Description"
                        rows="6"
                        style={{ height: "150px" }}
                        value={shortDescription}
                        onChange={(e) => {
                          setShortDescription(e.target.value);
                        }}
                      ></textarea>
                      <label htmlFor="Short Description">
                        Short Description
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="bestfor"
                        placeholder="Best For"
                        value={bestFor}
                        onChange={(e) => {
                          setBestFor(e.target.value);
                        }}
                      />
                      <label htmlFor="Bestfor">Best For</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="whentouse"
                        placeholder="When To Use"
                        value={whenToUse}
                        onChange={(e) => {
                          setWhenToUse(e.target.value);
                        }}
                      />
                      <label htmlFor="WhenToUse">When To Use</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="expectedOutput"
                        placeholder="Expected Output"
                        value={expectedOutput}
                        onChange={(e) => {
                          setExpectedOutput(e.target.value);
                        }}
                      />
                      <label htmlFor="Expected Output">Expected Output</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="BestWayToUse"
                        placeholder="Best Way To Use"
                        value={bestWayToUse}
                        onChange={(e) => {
                          setBestWayToUse(e.target.value);
                        }}
                      />
                      <label htmlFor="Best Way To Use">Best Way To USe</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className="form-control"
                        id="FullPromptText"
                        placeholder="Full Prompt Text"
                        value={fullPromptText}
                        onChange={(e) => {
                          setFullPromptText(e.target.value);
                        }}
                        style={{ height: "250px" }}
                      />
                      <label htmlFor="Full Prompt Text">Full Prompt Text</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    {currentImageUrl && (
                      <img
                        src={currentImageUrl}
                        alt="Current prompt"
                        style={{ height: "120px", objectFit: "cover" }}
                        className="mb-3 rounded"
                      />
                    )}
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="promptImage"
                        accept="image/*"
                        onChange={(e) => {
                          setPromptImage(e.target.files[0]);
                        }}
                      />
                      <label htmlFor="promptImage">Change Prompt Image</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptEdit;
