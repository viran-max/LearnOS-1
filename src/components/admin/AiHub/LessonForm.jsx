import React, { useEffect, useState } from "react";
import chapterService from "../../../services/chapterService";
import lessonService from "../../../services/lessonService";
import cloudinaryService from "../../../services/cloudinaryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AiHubSubNav from "./AiHubSubNav";

const LessonForm = () => {
  const [chapters, setChapters] = useState([]);
  const [chapterId, setChapterId] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [mainContent, setMainContent] = useState("");
  const [lessonImage, setLessonImage] = useState("");
  const [lessonOrder, setLessonOrder] = useState(1);
  const [status, setStatus] = useState("Draft");

  const nav = useNavigate();

  async function getChapters() {
    let response = await chapterService.getAll();
    setChapters(response);
  }

  async function SubmitForm(e) {
    e.preventDefault();

    if (!chapterId) {
      toast.error("Please select a Chapter first!");
      return;
    }

    try {
      let imageUrl = "";
      if (lessonImage) {
        imageUrl = await cloudinaryService.upload(lessonImage);
      }

      let payload = {
        chapterId: chapterId,
        heading: heading,
        description: description,
        mainContent: mainContent,
        lessonImage: imageUrl,
        lessonOrder: Number(lessonOrder),
        status: status,
      };
      lessonService.submitLesson(payload);
      nav("/admin/aiHub/lessonList");
      toast.success("Lesson Added!");
    } catch (err) {
      toast.error("Error Submiting Lesson");
      console.log("Lesson Error : ", err);
    }
  }

  useEffect(() => {
    getChapters();
  }, []);

  return (
    <>
      {/* Header  */}
      <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-plus-circle"></i> Create Lesson</h2>
      <p>Add a new lesson under a chapter.</p>
    </div>
    <AiHubSubNav />
  </div>
</div>

      {/* Lesson Form  */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              AI Hub - Admin
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
                      <select
                        className="form-select"
                        id="chapterId"
                        value={chapterId}
                        onChange={(e) => {
                          setChapterId(e.target.value);
                        }}
                      >
                        <option value="">Select Chapter</option>
                        {chapters.map((chapter) => (
                          <option key={chapter.id} value={chapter.id}>
                            {chapter.chapterNumber} - {chapter.title}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="chapterId">Chapter</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="heading"
                        placeholder="Heading"
                        onChange={(e) => {
                          setHeading(e.target.value);
                        }}
                      />
                      <label htmlFor="heading">Lesson Heading</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        rows="4"
                        style={{ height: "120px" }}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                      <label htmlFor="description">Short Description</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="mainContent"
                        placeholder="Main Content"
                        rows="10"
                        style={{ height: "250px" }}
                        onChange={(e) => {
                          setMainContent(e.target.value);
                        }}
                      ></textarea>
                      <label htmlFor="mainContent">Main Content</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="lessonOrder"
                        placeholder="Lesson Order"
                        value={lessonOrder}
                        onChange={(e) => {
                          setLessonOrder(e.target.value);
                        }}
                      />
                      <label htmlFor="lessonOrder">
                        Lesson Order (sequence within chapter)
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="lessonImage"
                        accept="image/*"
                        onChange={(e) => {
                          setLessonImage(e.target.files[0]);
                        }}
                      />
                      <label htmlFor="lessonImage">Lesson Image</label>
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

export default LessonForm;
