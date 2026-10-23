import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../../services/authService'
import chapterService from '../../services/chapterService'
import lessonService from '../../services/lessonService'
import promptService from '../../services/promptService'
import journeyService from '../../services/journeyService'
import userProgressService from '../../services/userProgressService'

function formatDate(timestamp){
  return new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function approvalBadgeClass(status){
  if (status === "approved") return "bg-success-subtle text-success border border-success-subtle";
  if (status === "pending") return "bg-warning-subtle text-warning border border-warning-subtle";
  return "bg-danger-subtle text-danger border border-danger-subtle";
}

const Dashboard = () => {

  const fullName = authService.getFullName();
  const userId = authService.getId();

  const [chapterCount, setChapterCount] = useState(0);
  const [promptCount, setPromptCount] = useState(0);
  const [journeyCount, setJourneyCount] = useState(0);
  const [lessonProgress, setLessonProgress] = useState({ completed: 0, total: 0 });
  const [latestChapter, setLatestChapter] = useState(null);
  const [latestJourney, setLatestJourney] = useState(null);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDashboardData(){
    const allChapters = await chapterService.getAll();
    const publishedChapters = allChapters.filter((c) => c.status === "Published");

    const allLessons = await lessonService.getAll();
    const publishedLessons = allLessons.filter((l) => l.status === "Published");

    const allPrompts = await promptService.getAll();

    const allJourneys = await journeyService.getAll();
    const publicJourneys = allJourneys.filter(
      (j) => j.status === "Published" && j.approvalStatus === "approved"
    );

    const myProgress = await userProgressService.getByUser(userId);

    setChapterCount(publishedChapters.length);
    setPromptCount(allPrompts.length);
    setJourneyCount(publicJourneys.length);
    setLessonProgress({ completed: myProgress.length, total: publishedLessons.length });

    //most recently added published chapter and public journey
    const sortedChapters = [...publishedChapters].sort((a, b) => b.createdAt - a.createdAt);
    setLatestChapter(sortedChapters[0] || null);

    const sortedJourneys = [...publicJourneys].sort((a, b) => b.createdAt - a.createdAt);
    setLatestJourney(sortedJourneys[0] || null);

    // this user's own journey submissions, regardless of approval status
    const myOwn = allJourneys.filter((j) => j.submittedBy === userId);
    myOwn.sort((a, b) => b.createdAt - a.createdAt);
    setMySubmissions(myOwn);

    setLoading(false);
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <>
      {/* Header  */}
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Welcome, {fullName}
              </h1>
              <p className="text-white mb-0">
                Access your AI Hub progress, Prompt Vault, and Journeys from here.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">

          {/* Stats row */}
          <div className="row g-4 mb-5">
            <div className="col-lg-3 col-md-6">
              <div className="border rounded-4 p-4 text-center">
                <h2 className="text-primary mb-1">{lessonProgress.completed}/{lessonProgress.total}</h2>
                <p className="text-muted mb-0">Lessons Completed</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="border rounded-4 p-4 text-center">
                <h2 className="text-primary mb-1">{chapterCount}</h2>
                <p className="text-muted mb-0">Chapters Available</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="border rounded-4 p-4 text-center">
                <h2 className="text-primary mb-1">{promptCount}</h2>
                <p className="text-muted mb-0">Prompts Available</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="border rounded-4 p-4 text-center">
                <h2 className="text-primary mb-1">{journeyCount}</h2>
                <p className="text-muted mb-0">Journeys Available</p>
              </div>
            </div>
          </div>

          {/* Quick access */}
          <h4 className="mb-4">Quick Access</h4>
          <div className="row g-4 mb-5">
            <div className="col-lg-4 col-md-6">
              <Link to="/aiHub" className="text-decoration-none text-dark">
                <div className="p-4 border rounded-4 h-100 text-center">
                  <i className="fa fa-book fa-3x text-primary mb-3" />
                  <h5>AI Hub</h5>
                  <p className="text-muted mb-0">Explore chapters and lessons.</p>
                </div>
              </Link>
            </div>

            <div className="col-lg-4 col-md-6">
              <Link to="/promptVault" className="text-decoration-none text-dark">
                <div className="p-4 border rounded-4 h-100 text-center">
                  <i className="fa fa-lightbulb fa-3x text-primary mb-3" />
                  <h5>Prompt Vault</h5>
                  <p className="text-muted mb-0">Browse ready-to-use AI prompts.</p>
                </div>
              </Link>
            </div>

            <div className="col-lg-4 col-md-6">
              <Link to="/journeys" className="text-decoration-none text-dark">
                <div className="p-4 border rounded-4 h-100 text-center">
                  <i className="fa fa-road fa-3x text-primary mb-3" />
                  <h5>Journeys</h5>
                  <p className="text-muted mb-0">Follow or submit a learning journey.</p>
                </div>
              </Link>
            </div>
          </div>

          {/* What's new */}
          {(latestChapter || latestJourney) &&
            <>
              <h4 className="mb-4">What's New</h4>
              <div className="row g-4 mb-5">
                {latestChapter &&
                  <div className="col-lg-6">
                    <Link to={`/aiHub/chapter/${latestChapter.id}`} className="text-decoration-none text-dark">
                      <div className="border rounded-4 p-4 h-100">
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill mb-2">
                          New Chapter
                        </span>
                        <h5 className="mb-2">{latestChapter.title}</h5>
                        <p className="text-muted mb-0">{latestChapter.description}</p>
                      </div>
                    </Link>
                  </div>
                }
                {latestJourney &&
                  <div className="col-lg-6">
                    <Link to={`/journeys/${latestJourney.id}`} className="text-decoration-none text-dark">
                      <div className="border rounded-4 p-4 h-100">
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill mb-2">
                          New Journey
                        </span>
                        <h5 className="mb-2">{latestJourney.journeyTitle}</h5>
                        <p className="text-muted mb-0">{latestJourney.hookLine || latestJourney.journeyDescription}</p>
                      </div>
                    </Link>
                  </div>
                }
              </div>
            </>
          }

          {/* My journey submissions */}
          <h4 className="mb-4">Your Journey Submissions</h4>

          {loading &&
            <p>Loading...</p>
          }

          {!loading && mySubmissions.length === 0 &&
            <div className="border rounded-4 p-4 text-center">
              <p className="text-muted mb-3">You haven't submitted a journey yet.</p>
              <Link to="/journeys/submit" className="btn btn-primary">
                Submit Your First Journey
              </Link>
            </div>
          }

          {!loading && mySubmissions.length > 0 &&
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  {mySubmissions.map((submission) => (
                    <tr key={submission.id}>
                      <td>{submission.journeyTitle}</td>
                      <td>
                        <span className={`badge rounded-pill ${approvalBadgeClass(submission.approvalStatus)}`}>
                          {submission.approvalStatus}
                        </span>
                      </td>
                      <td>{formatDate(submission.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default Dashboard