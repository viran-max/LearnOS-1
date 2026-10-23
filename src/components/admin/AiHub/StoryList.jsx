import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import storyService from "../../../services/storyService";
import lessonService from "../../../services/lessonService";
import Swal from "sweetalert2";
import AiHubSubNav from "./AiHubSubNav";

const StoryList = () => {

    const [stories,setStories] = useState([]);

    async function getStories(){
        let response = await storyService.getAll();
        response.sort((a,b)=> a.storyOrder - b.storyOrder); //for getting ordered stories list

        const storiesWithLesson = await Promise.all(
            response.map(async (story) => {
                const lesson = await lessonService.singleLesson(story.lessonId);
                return {
                    ...story,
                    lessonHeading: lesson ? lesson.heading : "Lesson Deleted",
                };
            })
        );

        setStories(storiesWithLesson);
    }

    async function deleteStory(id){
      Swal.fire({
        title:"Are you sure ?",
        text : "You will not reset it after deleting...",
        icon: "warning",
        showCancelButton:true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:"Yes, Delete it!"
      }).then(async(result)=>{
        if(result.isConfirmed){
          await storyService.deleteStory(id)
          getStories()
        }
      });

    }

    useEffect(()=>{
        getStories();
    },[]);

  return (
    <>
    {/* header  */}
      <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-collection-play"></i> All Stories</h2>
      <p>Manage existing stories across all lessons.</p>
    </div>
    <AiHubSubNav />
  </div>
</div>

      {/* Story Lists table  */}

      <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Lesson</th>
                    <th scope="col">Order</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Edits</th>
                  </tr>
                </thead>
                <tbody>

                  {stories.map((story,index) => (
                    <tr key={story.id}>
                      <td>
                        <p className="mb-0 mt-4">{index + 1}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{story.title}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{story.lessonHeading}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{story.storyOrder}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{story.status}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{new Date(story.createdAt).toLocaleTimeString()}</p>
                      </td>
                      <td>
                        <Link to={`/admin/aiHub/storyEdit/${story.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-danger" />
                        </button>
                        </Link>
                        &nbsp;
                        <button onClick={()=>{deleteStory(story.id)}} className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-trash text-danger" />
                        </button>
                      </td>
                    </tr>
                ))
                  }
              </tbody>
            </table>
          </div>

        </div>
      </div>


    </>
  );
};

export default StoryList;