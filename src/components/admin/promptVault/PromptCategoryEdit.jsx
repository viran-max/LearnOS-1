import React from "react";
import { useState, useEffect } from "react";

import promptCategoryService from "../../../services/promptCategoryService";
import cloudinaryService from "../../../services/cloudinaryService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PromptVaultSubNav from "./PromptVaultSubNav";

const PromptCategoryEdit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [status, setStatus] = useState("Draft");

  const nav = useNavigate();

  const params = useParams();


  async function updateCategory(e) {
    e.preventDefault();
    try {
      let imageUrl = currentImageUrl;
      if(categoryImage){
        imageUrl = await cloudinaryService.upload(categoryImage)
      }

      let payload = {
        name: name,
        description: description,
        categoryImage: imageUrl,
        status: status,
      };
      promptCategoryService.updateCategory(payload,params.id);
      nav(-1);
      toast.success("Prompt Category Updated!");
    } catch (error) {
        console.log("error : ", error);
    }
  }

  async function getCategoryDetails(){
    let response = await promptCategoryService.singleCategory(params.id);

    if(response){
        setName(response.name);
        setDescription(response.description);
        setCurrentImageUrl(response.categoryImage);
        setStatus(response.status);
    } else {
        alert("Some error occured!");
    }
  }

  useEffect(()=>{
    getCategoryDetails();
  },[]);

  return(
    <>
    {/* header  */}
   <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-pencil-square"></i> Edit Category</h2>
      <p>Update this category's details.</p>
    </div>
    <PromptVaultSubNav />
  </div>
</div>
    <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Edit Prompt Category
      </h6>
    </div>
    <div className="row g-4 justify-content-center">
      <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form onSubmit={updateCategory}>
          <div className="row g-3">
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Category Name"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
                <label htmlFor="name">Category Name</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Category Description"
                  rows="6"
                  style={{ height: "150px" }}
                  value={description}
                  onChange={(e)=>{setDescription(e.target.value)}}
                ></textarea>
                <label htmlFor="description">Category Description</label>
              </div>
            </div>

            <div className="col-md-12">
              {currentImageUrl && (
                <img
                  src={currentImageUrl}
                  alt="Current category"
                  style={{ height: "120px", objectFit: "cover" }}
                  className="mb-3 rounded"
                />
              )}
              <div className="form-floating">
                <input
                  type="file"
                  className="form-control"
                  id="categoryImage"
                  accept="image/*"
                  onChange={(e)=>{setCategoryImage(e.target.files[0])}}
                />
                <label htmlFor="categoryImage">Change Category Image</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="status"
                  value={status}
                  onChange={(e)=>{setStatus(e.target.value)}}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
                <label htmlFor="status">Status</label>
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
};

export default PromptCategoryEdit;