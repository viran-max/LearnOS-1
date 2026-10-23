import React from "react";
import chapterService from "../../../services/chapterService";
import cloudinaryService from "../../../services/cloudinaryService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AiHubSubNav from "./AiHubSubNav";

const ChapterForm = () => {
  const [title, setTitle] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [description, setDescription] = useState("");
  const [chapterImage, setChapterImage] = useState("");
  const [status, setStatus] = useState("Draft");

  async function SubmitForm(e) {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (chapterImage) {
        imageUrl = await cloudinaryService.upload(chapterImage);
      }

      let payload = {
        title: title,
        chapterNumber: Number(chapterNumber),
        description: description,
        chapterImage: imageUrl,
        status: status,
      };

      chapterService.submitChapter(payload);
      nav("/admin/aiHub/chapterList");
      toast.success("Chapter Added!");
    } catch (err) {
      toast.error("Error in submitting the chapter.");
      console.log("Chapter Error : ", err);
    }
  }

  const nav = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="container-xxl pt-5">
        <div className="container">
          <div className="aihub-page-header">
            <h2>
              <i className="bi bi-plus-circle"></i> Create Chapter
            </h2>
            <p>Add a new chapter to the AI Hub curriculum.</p>
          </div>
          <AiHubSubNav />
        </div>
      </div>

      {/* Chapter Form */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              AIHUB - Admin
            </h6>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form onSubmit={SubmitForm}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                      <label htmlFor="title">Chapter Title</label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="chapterNumber"
                        placeholder="Chapter No."
                        onChange={(e) => {
                          setChapterNumber(e.target.value);
                        }}
                      />
                      <label htmlFor="chapterNumber">Chapter No.</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Chapter Description"
                        rows="6"
                        style={{ height: "150px" }}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                      <label htmlFor="description">Chapter Description</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="chapterImage"
                        accept="image/*"
                        onChange={(e) => {
                          setChapterImage(e.target.files[0]);
                        }}
                      />
                      <label htmlFor="chapterImage">Chapter Image</label>
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

export default ChapterForm;
