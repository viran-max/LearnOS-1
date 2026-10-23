import React from "react";
import { useState, useEffect } from "react";

import storyService from "../../../services/storyService";
import lessonService from "../../../services/lessonService";
import cloudinaryService from "../../../services/cloudinaryService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AiHubSubNav from "./AiHubSubNav";

const StoryEdit = () => {
  const [lessons, setLessons] = useState([]);
  const [lessonId, setLessonId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [storyImage, setStoryImage] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [storyOrder, setStoryOrder] = useState(1);
  const [status, setStatus] = useState("Draft");

  const nav = useNavigate();
  const params = useParams();

  async function updateStory(e) {
    e.preventDefault();
    try {
      let imageUrl = currentImageUrl;
      if(storyImage){
        imageUrl = await cloudinaryService.upload(storyImage)
      }

      let payload = {
        lessonId: lessonId,
        title: title,
        content: content,
        storyImage: imageUrl,
        storyOrder: Number(storyOrder),
        status: status,
      };
      storyService.updateStory(payload,params.id);
      nav(-1);
      toast.success("Story Updated!");
    } catch (error) {
        console.log("error : ", error);
    }
  }

  async function getLessons(){
    let response = await lessonService.getAll();
    setLessons(response);
  }

  async function getStoryDetails(){
    let response = await storyService.singleStory(params.id);

    if(response){
        setLessonId(response.lessonId);
        setTitle(response.title);
        setContent(response.content);
        setCurrentImageUrl(response.storyImage);
        setStoryOrder(response.storyOrder || 1);
        setStatus(response.status);
    } else {
        alert("Some error occured!");
    }
  }

  useEffect(()=>{
    getLessons();
    getStoryDetails();
  },[]);

  return(
    <>
    {/* header  */}
    <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-pencil-square"></i> Edit Story</h2>
      <p>Update this story's details.</p>
    </div>
    <AiHubSubNav />
  </div>
</div>

    {/* Story Edit Form  */}
    <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Edit Story
      </h6>
    </div>
    <div className="row g-4 justify-content-center">
      <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form onSubmit={updateStory}>
          <div className="row g-3">

            <div className="col-md-12">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="lessonId"
                  value={lessonId}
                  onChange={(e)=>{setLessonId(e.target.value)}}
                >
                  <option value="">Select Lesson</option>
                  {lessons.map((lesson)=>(
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.heading}
                    </option>
                  ))}
                </select>
                <label htmlFor="lessonId">Lesson</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e)=>{setTitle(e.target.value)}}
                />
                <label htmlFor="title">Story Title</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="content"
                  placeholder="Story Content"
                  rows="10"
                  style={{ height: "250px" }}
                  value={content}
                  onChange={(e)=>{setContent(e.target.value)}}
                ></textarea>
                <label htmlFor="content">Story Content</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="storyOrder"
                  placeholder="Story Order"
                  value={storyOrder}
                  onChange={(e)=>{setStoryOrder(e.target.value)}}
                />
                <label htmlFor="storyOrder">Story Order (sequence within lesson)</label>
              </div>
            </div>

            <div className="col-md-12">
              {currentImageUrl && (
                <img
                  src={currentImageUrl}
                  alt="Current story"
                  style={{ height: "120px", objectFit: "cover" }}
                  className="mb-3 rounded"
                />
              )}
              <div className="form-floating">
                <input
                  type="file"
                  className="form-control"
                  id="storyImage"
                  accept="image/*"
                  onChange={(e)=>{setStoryImage(e.target.files[0])}}
                />
                <label htmlFor="storyImage">Change Story Image</label>
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

export default StoryEdit;