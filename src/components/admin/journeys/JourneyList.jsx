import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import journeyService from "../../../services/journeyService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import JourneySubNav from "./JourneySubNav";

const JourneyList = () => {

    const [journeys, setJourneys] = useState([]);

    async function getJourneys(){
        let response = await journeyService.getAll();
        response.sort((a,b) => {
            if(a.approvalStatus === "pending" && b.approvalStatus !== "pending") return -1;
            if(a.approvalStatus !== "pending" && b.approvalStatus === "pending") return 1;
            return 0;
        });
        setJourneys(response);
    }

    async function deleteJourney(id){
        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await journeyService.deleteJourney(id);
                getJourneys();
            }
        });
    }

    async function approveJourney(id){
        await journeyService.approveJourney(id);
        toast.success("Journey Approved!");
        getJourneys();
    }

    async function rejectJourney(id){
        await journeyService.rejectJourney(id);
        toast.info("Journey Rejected!");
        getJourneys();
    }

    function approvalBadge(status){
        if(status === "approved") return <span className="badge bg-success">Approved</span>
        if(status === "pending") return <span className="badge bg-warning text-dark">Pending Review</span>
        return <span className="badge bg-danger">Rejected</span>
    }

    useEffect(()=>{
        getJourneys();
    },[]);

  return (
    <>
    {/* header  */}
      <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-signpost-split"></i> All Journeys</h2>
      <p>Manage journeys — including community submissions awaiting review.</p>
    </div>
    <JourneySubNav />
  </div>
</div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">Cover</th>
                  <th scope="col">Title</th>
                  <th scope="col">Submitted By</th>
                  <th scope="col">Approval</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {journeys.map((journey, index) => (
                  <tr key={journey.id}>
                    <td><p className="mb-0 mt-4">{index + 1}</p></td>
                    <td>
                      {journey.coverImage &&
                        <img src={journey.coverImage} alt={journey.journeyTitle} style={{width:"60px", height:"60px", objectFit:"cover", borderRadius:"6px"}} className="mt-3" />
                      }
                    </td>
                    <td><p className="mb-0 mt-4">{journey.journeyTitle}</p></td>
                    <td><p className="mb-0 mt-4">{journey.submittedBy === "admin" ? "Admin" : "User Submission"}</p></td>
                    <td><p className="mb-0 mt-4">{approvalBadge(journey.approvalStatus)}</p></td>
                    <td><p className="mb-0 mt-4">{journey.status}</p></td>
                    <td>
                      
                      <Link to={`/admin/journeyView/${journey.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-eye text-primary" />
                        </button>
                      </Link>
                      &nbsp;
                      <Link to={`/admin/journeyEdit/${journey.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-danger" />
                        </button>
                      </Link>
                      &nbsp;
                      <button onClick={()=>{deleteJourney(journey.id)}} className="btn btn-md rounded-circle bg-light border mt-4">
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

export default JourneyList;