import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import chapterService from "../../../services/chapterService";
import lessonService from "../../../services/lessonService";

const LessonList = () => {

  const params = useParams();

  const [chapter, setChapter] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const chapterData = await chapterService.singleChapter(params.id);
    setChapter(chapterData);

    const lessonData = await lessonService.getByChapterId(params.id);
    let published = lessonData.filter((lesson) => lesson.status === "Published");
    published.sort((a, b) => a.lessonOrder - b.lessonOrder);

    setLessons(published);
    setLoading(false);
  }

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
                {chapter ? chapter.title : "Lessons"}
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to="/aiHub">
                      AI Hub
                    </Link>
                  </li>
                  <li className="breadcrumb-item text-white active">
                    {chapter ? chapter.title : ""}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">

          {loading &&
            <p className="text-center">Loading lessons...</p>
          }

          {!loading && lessons.length === 0 &&
            <p className="text-center">No lessons available in this chapter yet.</p>
          }

          <div className="row g-4">
            {lessons.map((lesson, index) => (
              <div className="col-lg-6" key={lesson.id}>
                <Link to={`/aiHub/lesson/${lesson.id}`} className="text-decoration-none text-dark">
                  <div className="border rounded p-4 h-100 d-flex align-items-start">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                      {index + 1}
                    </div>
                    <div>
                      <h5 className="mb-2">{lesson.heading}</h5>
                      <p className="text-muted mb-0">{lesson.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default LessonList;