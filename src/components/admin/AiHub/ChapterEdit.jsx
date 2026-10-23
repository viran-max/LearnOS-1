import React from "react";
import { useState, useEffect } from "react";

import chapterService from "../../../services/chapterService";
import cloudinaryService from "../../../services/cloudinaryService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AiHubSubNav from "./AiHubSubNav";

const ChapterEdit = () => {
  const [title, setTitle] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [description, setDescription] = useState("");
  const [chapterImage, setChapterImage] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [status, setStatus] = useState("Draft");

  const nav = useNavigate();

  const params = useParams();

  async function updateChapter(e) {
    e.preventDefault();
    try {
      let imageUrl = currentImageUrl;
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
      chapterService.updateChapter(payload, params.id);
      nav(-1);
      toast.success("Chapter Updated!");
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function getChapterDetails() {
    let response = await chapterService.singleChapter(params.id);

    if (response) {
      setTitle(response.title);
      setChapterNumber(response.chapterNumber);
      setDescription(response.description);
      setCurrentImageUrl(response.chapterImage);
      setStatus(response.status);
    } else {
      alert("Some error occured!");
    }
  }

  useEffect(() => {
    getChapterDetails();
  }, []);

  return (
    <>
      {/* header  */}
      <div className="container-xxl pt-5">
        <div className="container">
          <div className="aihub-page-header">
            <h2>
              <i className="bi bi-pencil-square"></i> Edit Chapter
            </h2>
            <p>Update this chapter's details.</p>
          </div>
          <AiHubSubNav />
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Edit Chapter
            </h6>
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form onSubmit={updateChapter}>
                <div className="row g-3">
                  <div className="col-md-8">
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
                        value={chapterNumber}
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
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                      <label htmlFor="description">Chapter Description</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    {currentImageUrl && (
                      <img
                        src={currentImageUrl}
                        alt="Current chapter"
                        style={{ height: "120px", objectFit: "cover" }}
                        className="mb-3 rounded"
                      />
                    )}
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
                      <label htmlFor="chapterImage">Change Chapter Image</label>
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

export default ChapterEdit;
