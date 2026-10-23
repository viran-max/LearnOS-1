import React from "react";
import { useState, useEffect } from "react";

import journeyService from "../../../services/journeyService";
import cloudinaryService from "../../../services/cloudinaryService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import JourneySubNav from "./JourneySubNav";

const JourneyEdit = () => {
  const [journeyTitle, setJourneyTitle] = useState("");
  const [hookLine, setHookLine] = useState("");
  const [journeyDescription, setJourneyDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [status, setStatus] = useState("Draft");
  const [approvalStatus, setApprovalStatus] = useState("approved");
  const [submittedByName, setSubmittedByName] = useState("");
  const [createdAt, setCreatedAt] = useState(null);

  const nav = useNavigate();
  const params = useParams();

  async function updateJourney(e) {
    e.preventDefault();
    try {
      let imageUrl = existingImage;
      if (coverImage) {
        imageUrl = await cloudinaryService.upload(coverImage);
      }

      let payload = {
        journeyTitle: journeyTitle,
        hookLine: hookLine,
        journeyDescription: journeyDescription,
        coverImage: imageUrl,
        status: status,
        approvalStatus: approvalStatus,
      };
      journeyService.updateJourney(payload, params.id);
      nav(-1);
      toast.success("Journey Updated!");
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async function getJourneyDetails(){
    let response = await journeyService.singleJourney(params.id);

    if(response){
        setJourneyTitle(response.journeyTitle);
        setHookLine(response.hookLine);
        setJourneyDescription(response.journeyDescription);
        setExistingImage(response.coverImage);
        setStatus(response.status);
        setApprovalStatus(response.approvalStatus);
        setSubmittedByName(response.submittedByName);
        setCreatedAt(response.createdAt);
    } else {
        alert("Some error occured!");
    }
  }

  useEffect(()=>{
    getJourneyDetails();
  },[]);

  return(
    <>
    {/* header  */}
    <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-pencil-square"></i> Edit Journey</h2>
      <p>Update this journey's details or review its approval status.</p>
    </div>
    <JourneySubNav />
  </div>
</div>

    <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Edit Journey
      </h6>
    </div>

    {submittedByName &&
      <p className="text-center text-muted mb-4">
        Submitted by <strong>{submittedByName}</strong>
        {createdAt && ` on ${new Date(createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
      </p>
    }

    <div className="row g-4 justify-content-center">
      <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

        {existingImage &&
          <img src={existingImage} alt="cover" style={{width:"100%", maxHeight:"200px", objectFit:"cover", borderRadius:"8px"}} className="mb-3" />
        }

        <form onSubmit={updateJourney}>
          <div className="row g-3">

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="journeyTitle"
                  placeholder="Journey Title"
                  value={journeyTitle}
                  onChange={(e)=>{setJourneyTitle(e.target.value)}}
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
                  onChange={(e)=>{setHookLine(e.target.value)}}
                />
                <label htmlFor="hookLine">Hook Line</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="journeyDescription"
                  placeholder="Journey Description"
                  rows="6"
                  style={{ height: "150px" }}
                  value={journeyDescription}
                  onChange={(e)=>{setJourneyDescription(e.target.value)}}
                ></textarea>
                <label htmlFor="journeyDescription">Journey Description</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="file"
                  className="form-control"
                  id="coverImage"
                  accept="image/*"
                  onChange={(e)=>{setCoverImage(e.target.files[0])}}
                />
                <label htmlFor="coverImage">Replace Cover Image (optional)</label>
              </div>
            </div>

            <div className="col-md-6">
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

            <div className="col-md-6">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="approvalStatus"
                  value={approvalStatus}
                  onChange={(e)=>{setApprovalStatus(e.target.value)}}
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
                <label htmlFor="approvalStatus">Approval Status</label>
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

export default JourneyEdit;