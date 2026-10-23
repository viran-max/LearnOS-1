import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import lessonService from "../../../services/lessonService";
import chapterService from "../../../services/chapterService";
import Swal from "sweetalert2";
import AiHubSubNav from "./AiHubSubNav";

const LessonList = () => {
  const [lessons, setLessons] = useState([]);

  async function getLessons() {
    let response = await lessonService.getAll();

    const lessonsWithChapter = await Promise.all(
      response.map(async (lesson) => {
        const chapter = await chapterService.singleChapter(lesson.chapterId);
        return {
          ...lesson,
          chapterTitle: chapter ? chapter.title : "Chapter Deleted",
        };
      }),
    );

    setLessons(lessonsWithChapter);
  }

  async function deleteLesson(id) {
    Swal.fire({
      title: "Are you sure ?",
      text: "You will not reset it after deleting...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await lessonService.deleteLesson(id);
        getLessons();
      }
    });
  }

  useEffect(() => {
    getLessons();
  }, []);

  return (
    <>
      {/* header  */}
      <div className="container-xxl pt-5">
        <div className="container">
          <div className="aihub-page-header">
            <h2>
              <i className="bi bi-journal-text"></i> All Lessons
            </h2>
            <p>Manage existing lessons across all chapters.</p>
          </div>
          <AiHubSubNav />
        </div>
      </div>

      {/* Lesson Lists table  */}

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">Heading</th>
                  <th scope="col">Chapter</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Edits</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson, index) => (
                  <tr key={lesson.id}>
                    <td>
                      <p className="mb-0 mt-4">{index + 1}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{lesson.heading}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{lesson.chapterTitle}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{lesson.status}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">
                        {new Date(lesson.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td>
                      <Link to={`/admin/aiHub/lessonEdit/${lesson.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-danger" />
                        </button>
                      </Link>
                      &nbsp;
                      <button
                        onClick={() => {
                          deleteLesson(lesson.id);
                        }}
                        className="btn btn-md rounded-circle bg-light border mt-4"
                      >
                        <i className="bi bi-trash text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonList;
