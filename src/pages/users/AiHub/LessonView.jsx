import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import lessonService from "../../../services/lessonService";
import storyService from "../../../services/storyService";
import userProgressService from "../../../services/userProgressService";
import authService from "../../../services/authService";
import { toast } from "react-toastify";

const WORDS_PER_MINUTE = 200;
const MIN_READ_SECONDS = 20;

function estimateReadSeconds(stories) {
  const totalWords = stories.reduce((sum, story) => {
    const words = (story.content || "").trim().split(/\s+/).filter(Boolean).length;
    return sum + words;
  }, 0);
  const seconds = Math.round((totalWords / WORDS_PER_MINUTE) * 60);
  return Math.max(seconds, MIN_READ_SECONDS);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const LessonView = () => {

  const params = useParams();
  const nav = useNavigate();
  const userId = authService.getId();

  const [lesson, setLesson] = useState(null);
  const [stories, setStories] = useState([]);
  const [nextLesson, setNextLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [marking, setMarking] = useState(false);
  const intervalRef = useRef(null);

  async function getData() {
    const lessonData = await lessonService.singleLesson(params.id);
    setLesson(lessonData);

    const storyData = await storyService.getByLessonId(params.id);
    const publishedStories = storyData.filter((s) => s.status === "Published");
    publishedStories.sort((a, b) => a.storyOrder - b.storyOrder);
    setStories(publishedStories);

    // find the next lesson in this chapter, so we know what to link to once complete
    const siblingLessons = await lessonService.getByChapterId(lessonData.chapterId);
    const publishedSiblings = siblingLessons
      .filter((l) => l.status === "Published")
      .sort((a, b) => a.lessonOrder - b.lessonOrder);
    const currentIndex = publishedSiblings.findIndex((l) => l.id === params.id);
    setNextLesson(publishedSiblings[currentIndex + 1] || null);

    // has this user already completed this lesson before?
    const myProgress = await userProgressService.getByUser(userId);
    const isDone = myProgress.some((p) => p.lessonId === params.id);
    setAlreadyCompleted(isDone);

    if (!isDone) {
      const estimate = estimateReadSeconds(publishedStories);
      setTotalSeconds(estimate);
      setSecondsLeft(estimate);
    }

    setLoading(false);
  }

  useEffect(() => {
    getData();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (loading || alreadyCompleted || totalSeconds === 0) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [loading, alreadyCompleted, totalSeconds]);

  async function handleComplete() {
    setMarking(true);
    try {
      await userProgressService.markComplete({
        userId: userId,
        chapterId: lesson.chapterId,
        lessonId: lesson.id,
      });
      toast.success("Lesson completed!");
      setAlreadyCompleted(true);
    } catch (err) {
      toast.error("Could not save your progress");
      console.log("markComplete error:", err);
    }
    setMarking(false);
  }

  const canComplete = alreadyCompleted || secondsLeft === 0;

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                {lesson ? lesson.heading : "Lesson"}
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to="/aiHub">
                      AI Hub
                    </Link>
                  </li>
                  {lesson &&
                    <li className="breadcrumb-item">
                      <Link className="text-white" to={`/aiHub/chapter/${lesson.chapterId}`}>
                        Back to Chapter
                      </Link>
                    </li>
                  }
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container" style={{ maxWidth: "800px" }}>

          {loading &&
            <p className="text-center">Loading lesson...</p>
          }

          {!loading && !alreadyCompleted &&
            <div className="alert alert-primary d-flex justify-content-between align-items-center mb-4">
              <span>
                <i className="bi bi-clock me-2" />
                {secondsLeft > 0
                  ? `Estimated read time remaining: ${formatTime(secondsLeft)}`
                  : "You're done reading — you can mark this lesson complete now."}
              </span>
            </div>
          }

          {lesson && lesson.mainContent &&
            <div className="border-start border-primary border-4 ps-3 mb-5">
              <p className="fst-italic text-muted mb-0" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
                {lesson.mainContent}
              </p>
            </div>
          }

          {stories.map((story) => (
            <div className="mb-5" key={story.id}>
              {story.storyImage &&
                <img
                  src={story.storyImage}
                  alt={story.title}
                  className="img-fluid rounded mb-4"
                  style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
                />
              }
              <h3 className="mb-3">{story.title}</h3>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}>
                {story.content}
              </p>
            </div>
          ))}

          {!loading && stories.length === 0 &&
            <p className="text-center">This lesson has no content yet.</p>
          }

          {!loading && stories.length > 0 &&
            <div className="border-top pt-4 mt-4 text-center">

              {!alreadyCompleted &&
                <button
                  className="btn btn-primary px-5 py-3 mb-3"
                  disabled={!canComplete || marking}
                  onClick={handleComplete}
                >
                  {marking ? "Saving..." : canComplete ? "Mark Lesson Complete" : `Keep Reading (${formatTime(secondsLeft)})`}
                </button>
              }

              {alreadyCompleted &&
                <>
                  {nextLesson
                    ? <button className="btn btn-primary px-5 py-3" onClick={() => nav(`/aiHub/lesson/${nextLesson.id}`)}>
                        Read Next Lesson
                      </button>
                    : <button className="btn btn-primary px-5 py-3" onClick={() => nav(`/aiHub/chapter/${lesson.chapterId}`)}>
                        Back to Chapter
                      </button>
                  }
                </>
              }

            </div>
          }

        </div>
      </div>
    </>
  );
};

export default LessonView;