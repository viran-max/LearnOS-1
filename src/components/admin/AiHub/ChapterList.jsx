import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chapterService from "../../../services/chapterService";
import Swal from "sweetalert2";
import AiHubSubNav from "./AiHubSubNav";

const ChapterList = () => {
  const [chapters, setChapters] = useState([]);

  async function getChapters() {
    let response = await chapterService.getAll();
    response.sort((a, b) => a.chapterNumber - b.chapterNumber);
    setChapters(response);
  }

  async function deleteChapter(id) {
    Swal.fire({
      title: "Are you sure ?",
      text: "With Chapter the Lessons will also be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await chapterService.deleteChapter(id);
        getChapters();
      }
    });
  }

  useEffect(() => {
    getChapters();
  }, []);

  return (
    <>
      {/* header  */}
      <div className="container-xxl pt-5">
        <div className="container">
          <div className="aihub-page-header">
            <h2>
              <i className="bi bi-collection"></i> All Chapters
            </h2>
            <p>Manage existing chapters — edit, publish, or remove.</p>
          </div>
          <AiHubSubNav />
        </div>
      </div>

      {/* Chapter Lists table  */}

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S No.</th>
                  <th scope="col">Chapter No.</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Edits</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter, index) => (
                  <tr key={chapter.id}>
                    <td>
                      <p className="mb-0 mt-4">{index + 1}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{chapter.chapterNumber}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{chapter.title}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{chapter.status}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">
                        {new Date(chapter.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td>
                      <Link to={`/admin/aiHub/chapterEdit/${chapter.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-danger" />
                        </button>
                      </Link>
                      &nbsp;
                      <button
                        onClick={() => {
                          deleteChapter(chapter.id);
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

export default ChapterList;
