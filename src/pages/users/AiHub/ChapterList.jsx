import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chapterService from "../../../services/chapterService";
import lessonService from "../../../services/lessonService";
import userProgressService from "../../../services/userProgressService";
import authService from "../../../services/authService";

const ChapterList = () => {

  const [chapters, setChapters] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);

  async function getChapters() {
    let response = await chapterService.getAll();

    let published = response.filter((chapter) => chapter.status === "Published");
    published.sort((a, b) => a.chapterNumber - b.chapterNumber);
    setChapters(published);

    // build a { chapterId: { completed, total } } map so each card can show progress
    const allLessons = await lessonService.getAll();
    const myProgress = await userProgressService.getByUser(authService.getId());
    const completedLessonIds = new Set(myProgress.map((p) => p.lessonId));

    const map = {};
    published.forEach((chapter) => {
      const chapterLessons = allLessons.filter(
        (l) => l.chapterId === chapter.id && l.status === "Published"
      );
      const completedCount = chapterLessons.filter((l) => completedLessonIds.has(l.id)).length;
      map[chapter.id] = { completed: completedCount, total: chapterLessons.length };
    });
    setProgressMap(map);

    setLoading(false);
  }

  useEffect(() => {
    getChapters();
  }, []);

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                AI Hub
              </h1>
              <p className="text-white mb-0">
                Story-driven chapters to build your AI fundamentals, step by step.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">

          {loading &&
            <p className="text-center">Loading chapters...</p>
          }

          {!loading && chapters.length === 0 &&
            <p className="text-center">No chapters available yet. Check back soon!</p>
          }

          <div className="row g-4">
            {chapters.map((chapter) => {
              const progress = progressMap[chapter.id] || { completed: 0, total: 0 };
              const percent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

              return (
                <div className="col-lg-4 col-md-6" key={chapter.id}>
                  <Link to={`/aiHub/chapter/${chapter.id}`} className="text-decoration-none text-dark">
                    <div className="border rounded overflow-hidden h-100">
                      {chapter.chapterImage &&
                        <img
                          src={chapter.chapterImage}
                          alt={chapter.title}
                          style={{ width: "100%", height: "180px", objectFit: "cover" }}
                        />
                      }
                      <div className="p-4">
                        <span className="badge bg-primary mb-2">Chapter {chapter.chapterNumber}</span>
                        <h5 className="mb-2">{chapter.title}</h5>
                        <p className="text-muted mb-3">{chapter.description}</p>

                        {progress.total > 0 &&
                          <>
                            <div className="progress mb-1" style={{ height: "6px" }}>
                              <div
                                className="progress-bar bg-success"
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                            <p className="text-muted small mb-0">
                              {progress.completed} of {progress.total} lessons completed
                            </p>
                          </>
                        }
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default ChapterList;