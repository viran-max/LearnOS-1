import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import journeyService from '../../../services/journeyService'
import cloudinaryService from '../../../services/cloudinaryService'
import authService from '../../../services/authService'

const SubmitJourney = () => {

  const [journeyTitle, setJourneyTitle] = useState("");
  const [hookLine, setHookLine] = useState("");
  const [journeyDescription, setJourneyDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = "";
      if (coverImage) {
        imageUrl = await cloudinaryService.upload(coverImage);
      }

      let payload = {
        journeyTitle: journeyTitle,
        hookLine: hookLine,
        journeyDescription: journeyDescription,
        coverImage: imageUrl,
        userId: authService.getId(),
        userName: authService.getFullName(),
      };

      await journeyService.submitUserJourney(payload);
      toast.success("Journey submitted! It will be reviewed by an admin before going live.");
      nav("/journeys");

    } catch (err) {
      toast.error("Error submitting your journey");
      console.log("Submit Journey Error : ", err);
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Submit Your Journey
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="text-white" to="/journeys">
                      Journeys
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mb-4">
            <p className="text-muted">
              Share your own learning journey with the community. Every submission
              is reviewed by an admin before it becomes publicly visible.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 col-md-10">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="journeyTitle"
                        placeholder="Journey Title"
                        value={journeyTitle}
                        onChange={(e) => { setJourneyTitle(e.target.value) }}
                        required
                      />
                      <label htmlFor="journeyTitle">Journey Title</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="hookLine"
                        placeholder="Hook Line"
                        value={hookLine}
                        onChange={(e) => { setHookLine(e.target.value) }}
                      />
                      <label htmlFor="hookLine">Hook Line (a one-line summary to grab attention)</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="journeyDescription"
                        placeholder="Journey Description"
                        rows="8"
                        style={{ height: "200px" }}
                        value={journeyDescription}
                        onChange={(e) => { setJourneyDescription(e.target.value) }}
                        required
                      ></textarea>
                      <label htmlFor="journeyDescription">Tell your story</label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="file"
                        className="form-control"
                        id="coverImage"
                        accept="image/*"
                        onChange={(e) => { setCoverImage(e.target.files[0]) }}
                      />
                      <label htmlFor="coverImage">Cover Image</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit for Review"}
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
}

export default SubmitJourney