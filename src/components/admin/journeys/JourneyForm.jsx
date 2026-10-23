import React, { useState } from 'react'
import journeyService from '../../../services/journeyService';
import cloudinaryService from '../../../services/cloudinaryService';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import JourneySubNav from './JourneySubNav';

const JourneyForm = () => {

    const [journeyTitle,setJourneyTitle] = useState("");
    const [hookLine,setHookLine] = useState("");
    const [journeyDescription,setJourneyDescription] = useState("");
    const [coverImage,setCoverImage] = useState("");
    const [status,setStatus] = useState("Draft");

    const nav = useNavigate();

    async function SubmitForm(e){
        e.preventDefault();

        try{
            let imageUrl = ""
            if(coverImage){
                imageUrl = await cloudinaryService.upload(coverImage)
            }

            let payload = {
                journeyTitle: journeyTitle,
                hookLine: hookLine,
                journeyDescription: journeyDescription,
                coverImage: imageUrl,
                status: status,
            }
            journeyService.submitJourney(payload);
            nav('/admin/journeys/journeyList')
            toast.success("Journey Added!");

        } catch(err) {
            toast.error("Error Submiting Journey")
            console.log("Journey Error : ", err);
        }

    }

  return (
    <>

    {/* Header */}
<div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-plus-circle"></i> Create Journey</h2>
      <p>Add a new journey to LearnOS.</p>
    </div>
    <JourneySubNav />
  </div>
</div>

    {/* Journey Form  */}
    <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Journeys - Admin
      </h6>
    </div>
    <div className="row g-4 justify-content-center">
      <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form onSubmit={SubmitForm}>
          <div className="row g-3">

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="journeyTitle"
                  placeholder="Journey Title"
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
                  onChange={(e)=>{setHookLine(e.target.value)}}
                />
                <label htmlFor="hookLine">Hook Line (short one-liner shown on the card)</label>
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
                <label htmlFor="coverImage">Cover Image</label>
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
}

export default JourneyForm