import React from "react";
import promptCategoryService from "../../../services/promptCategoryService";
import cloudinaryService from "../../../services/cloudinaryService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptVaultSubNav from "./PromptVaultSubNav";
import { toast } from "react-toastify";

const PromptCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [status, setStatus] = useState("Draft");

  const nav = useNavigate();

  async function SubmitForm(e){
    e.preventDefault()

    try{
      let imageUrl = ""
      if(categoryImage){
        imageUrl = await cloudinaryService.upload(categoryImage)
      }

      let payload = {
        name:name,
        description:description,
        categoryImage:imageUrl,
        status:status,
      }

      promptCategoryService.submitCategory(payload);
      nav("/admin/promptVault/categoryList");
      toast.success("Prompt Category Added!");
    } catch(err){
    toast.error("Error in submitting the category.");
    console.log("Prompt Category Error : ",err);
  }
  } 

  return (
    <>
      {/* Header  */}
      <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-plus-circle"></i> Create Category</h2>
      <p>Add a new prompt category.</p>
    </div>
    <PromptVaultSubNav />
  </div>
</div>

      {/* Category Form */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Prompt Vault - Admin
            </h6>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form onSubmit={SubmitForm}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Category Name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                      <label htmlFor="description">Category Description</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="categoryImage"
                        accept="image/*"
                        onChange={(e) => {
                          setCategoryImage(e.target.files[0]);
                        }}
                      />
                      <label htmlFor="categoryImage">Category Image</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                      <label htmlFor="status">Status</label>
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

export default PromptCategoryForm;