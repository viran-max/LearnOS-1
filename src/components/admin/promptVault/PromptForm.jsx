import React from 'react'
import promptService from '../../../services/promptService';
import promptCategoryService from '../../../services/promptCategoryService';
import cloudinaryService from "../../../services/cloudinaryService"
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PromptVaultSubNav from './PromptVaultSubNav';

const PromptForm = () => {

    const [categories,setCategories] = useState([]);
    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [difficulty,setDifficulty] = useState("");
    const [shortDescription,setShortDescription] = useState("");
    const [bestFor,setBestFor] = useState("");
    const [whenToUse,setWhenToUse] = useState("");
    const [expectedOutput,setExpectedOutput] = useState("");
    const [bestWayToUse,setBestWayToUse] = useState("");
    const [fullPromptText,setFullPromptText] = useState("");
    const [promptImage,setPromptImage] = useState("");

    const nav = useNavigate();

    async function getCategories(){
        let response = await promptCategoryService.getAll();
        setCategories(response);
    }

    async function SubmitForm(e){
        e.preventDefault();

        if (!category) {
            toast.error("Please select a Category first!");
            return;
        }

        try{
            let imageUrl = ""
            if(promptImage){
                imageUrl = await cloudinaryService.upload(promptImage)
            }

            let payload = {
                title : title,
                category: category,
                Difficulty: difficulty,
                shortDescription : shortDescription,
                bestFor: bestFor,
                whenToUse:whenToUse,
                expectedOutput:expectedOutput,
                bestWayToUse:bestWayToUse,
                fullPromptText:fullPromptText,
                promptImage:imageUrl,
            }
            promptService.submitPrompt(payload);
            nav('/admin/promptVault/promptList')
            toast.success("Prompt Added!");




        } catch(err) {
            toast.error("Error Submiting Prompt")
            console.log("Prompt Error : ", err);
        }

    }

    useEffect(()=>{
        getCategories();
    },[]);

  return (
    <>

    {/* Header */}
<div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-plus-circle"></i> Create Prompt</h2>
      <p>Add a new prompt to the Prompt Vault.</p>
    </div>
    <PromptVaultSubNav />
  </div>
</div>

    {/* Prompt Form  */}
    <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Prompt Vault - Admin
      </h6>
    </div>
    <div className="row g-4 justify-content-center">
      <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form onSubmit={SubmitForm}>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                  onChange={(e)=>{setTitle(e.target.value)}}
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
                  onChange={(e)=>{setCategory(e.target.value)}}
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
                  onChange={(e)=>{setDifficulty(e.target.value)}}
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
                  onChange={(e)=>{setShortDescription(e.target.value)}}
                ></textarea>
                <label htmlFor="Short Description">Short Description</label>
              </div>
            </div>

             <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="bestfor"
                  placeholder="Best For"
                  onChange={(e)=>{setBestFor(e.target.value)}}
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
                  onChange={(e)=>{setWhenToUse(e.target.value)}}
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
                  onChange={(e)=>{setExpectedOutput(e.target.value)}}
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
                  onChange={(e)=>{setBestWayToUse(e.target.value)}}
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
                  onChange={(e)=>{setFullPromptText(e.target.value)}}
                  style={{ height: "250px" }}
                />
                <label htmlFor="Full Prompt Text">Full Prompt Text</label>
              </div>
            </div>

             <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="file"
                  className="form-control"
                  id="promptImage"
                  accept="image/*"
                  onChange={(e)=>{setPromptImage(e.target.files[0])}}
                />
                <label htmlFor="promptImage">Prompt Image</label>
              </div>
            </div>

            <div className="col-12">
              <button className="btn btn-primary w-100 py-3" type="submit">
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
  )
}

export default PromptForm