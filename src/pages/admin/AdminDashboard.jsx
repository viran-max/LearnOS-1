import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import chapterService from '../../services/chapterService'
import lessonService from '../../services/lessonService'
import storyService from '../../services/storyService'
import promptService from '../../services/promptService'
import promptCategoryService from '../../services/promptCategoryService'
import journeyService from '../../services/journeyService'

function formatDate(timestamp){
  return new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const AdminDashboard = () => {

  const [counts, setCounts] = useState({
    chapters: 0, lessons: 0, stories: 0, prompts: 0, categories: 0, journeys: 0
  });
  const [pendingCount, setPendingCount] = useState(0);
  const [recentFeed, setRecentFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDashboardData(){
    const [chapters, lessons, stories, prompts, categories, journeys] = await Promise.all([
      chapterService.getAll(),
      lessonService.getAll(),
      storyService.getAll(),
      promptService.getAll(),
      promptCategoryService.getAll(),
      journeyService.getAll(),
    ]);

    setCounts({
      chapters: chapters.length,
      lessons: lessons.length,
      stories: stories.length,
      prompts: prompts.length,
      categories: categories.length,
      journeys: journeys.length,
    });

    const pending = journeys.filter((j) => j.approvalStatus === "pending");
    setPendingCount(pending.length);

    const feed = [
      ...chapters.map((c) => ({ type: "Chapter", icon: "fa-book", title: c.title, createdAt: c.createdAt })),
      ...lessons.map((l) => ({ type: "Lesson", icon: "fa-file-alt", title: l.heading, createdAt: l.createdAt })),
      ...stories.map((s) => ({ type: "Story", icon: "fa-scroll", title: s.title, createdAt: s.createdAt })),
      ...prompts.map((p) => ({ type: "Prompt", icon: "fa-lightbulb", title: p.title, createdAt: p.createdAt })),
      ...categories.map((c) => ({ type: "Category", icon: "fa-tags", title: c.name, createdAt: c.createdAt })),
      ...journeys.map((j) => ({ type: "Journey", icon: "fa-road", title: j.journeyTitle, createdAt: j.createdAt })),
    ];
    feed.sort((a, b) => b.createdAt - a.createdAt);
    setRecentFeed(feed.slice(0, 8));

    setLoading(false);
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">

        <h2 className="mb-4">Admin Dashboard</h2>

        {!loading && pendingCount > 0 &&
          <div className="alert alert-warning d-flex justify-content-between align-items-center" role="alert">
            <span>
              <i className="bi bi-exclamation-triangle-fill me-2" />
              You have <strong>{pendingCount}</strong> journey submission{pendingCount > 1 ? "s" : ""} waiting for review.
            </span>
            <Link to="/admin/journeys/journeyList" className="btn btn-sm btn-warning">
              Review Now
            </Link>
          </div>
        }

        {/* Content counts */}
        <h5 className="mt-5 mb-3">Content Overview</h5>
        <div className="row g-3 mb-5">
          <div className="col-lg-2 col-md-4 col-6">
            <div className="border rounded-4 p-3 text-center">
              <h3 className="text-primary mb-0">{counts.chapters}</h3>
              <p className="text-muted small mb-0">Chapters</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="border rounded-4 p-3 text-center">
              <h3 className="text-primary mb-0">{counts.lessons}</h3>
              <p className="text-muted small mb-0">Lessons</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="border rounded-4 p-3 text-center">
              <h3 className="text-primary mb-0">{counts.stories}</h3>
              <p className="text-muted small mb-0">Stories</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="border rounded-4 p-3 text-center">
              <h3 className="text-primary mb-0">{counts.categories}</h3>
              <p className="text-muted small mb-0">Categories</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="border rounded-4 p-3 text-center">
              <h3 className="text-primary mb-0">{counts.prompts}</h3>
              <p className="text-muted small mb-0">Prompts</p>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="border rounded-4 p-3 text-center">
              <h3 className="text-primary mb-0">{counts.journeys}</h3>
              <p className="text-muted small mb-0">Journeys</p>
            </div>
          </div>
        </div>

        {/* Quick create links */}
        <h5 className="mb-3">Quick Create</h5>
        <div className="row g-3 mb-5">
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/admin/aiHub" className="btn btn-outline-primary w-100 py-3">
              + Chapter
            </Link>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/admin/aiHub/createLesson" className="btn btn-outline-primary w-100 py-3">
              + Lesson
            </Link>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/admin/aiHub/createStory" className="btn btn-outline-primary w-100 py-3">
              + Story
            </Link>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/admin/promptVault/createCategory" className="btn btn-outline-primary w-100 py-3">
              + Category
            </Link>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/admin/promptVault" className="btn btn-outline-primary w-100 py-3">
              + Prompt
            </Link>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <Link to="/admin/journeys" className="btn btn-outline-primary w-100 py-3">
              + Journey
            </Link>
          </div>
        </div>

        {/* Recent activity feed */}
        <h5 className="mb-3">Recently Added</h5>
        {loading &&
          <p className="text-muted">Loading...</p>
        }
        {!loading && recentFeed.length === 0 &&
          <p className="text-muted">Nothing added yet.</p>
        }
        {!loading && recentFeed.length > 0 &&
          <div className="border rounded-4">
            {recentFeed.map((item, index) => (
              <div
                key={index}
                className={`d-flex align-items-center justify-content-between p-3 ${index !== recentFeed.length - 1 ? "border-bottom" : ""}`}
              >
                <div className="d-flex align-items-center">
                  <i className={`fa ${item.icon} text-primary me-3`} />
                  <div>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill me-2">
                      {item.type}
                    </span>
                    <span>{item.title}</span>
                  </div>
                </div>
                <span className="text-muted small">{formatDate(item.createdAt)}</span>
              </div>
            ))}
          </div>
        }

      </div>
    </div>
  )
}

export default AdminDashboard