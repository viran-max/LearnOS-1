import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import promptService from "../../../services/promptService";
import Swal from "sweetalert2";
import PromptVaultSubNav from "./PromptVaultSubNav";

const PromptLists = () => {

    const [prompts,setPrompts] = useState([]);

    async function getPrompts(){
        let response = await promptService.getAll();
        setPrompts(response);
    }

    async function deletePrompt(id){

      Swal.fire({
        title:"Are you sure ?",
        text : "You won't be able to revert this!",
        icon: "warning",
        showCancelButton:true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:"Yes, Delete it!"
      }).then(async(result)=>{
        if(result.isConfirmed){
          await promptService.deletePrompt(id)
          getPrompts()

          // Swal.fire({
          //   title:"Deleted!",
          //   text:"Your prompt has been deleted.",
          //   icon:"success"
          // });
        }
      });

    }

    useEffect(()=>{
        getPrompts();
    },[]);

    

  return (
    <>
    <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-lightbulb"></i> All Prompts</h2>
      <p>Manage existing prompts — edit, publish, or remove.</p>
    </div>
    <PromptVaultSubNav />
  </div>
</div>

      {/* Prompt Lists table  */}

      <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Edits</th>
                  </tr>
                </thead>
                <tbody>

                  {prompts.map((prompt,index) => (
                    <tr key={prompt.id}>
                      <td>
                        <p className="mb-0 mt-4">{index + 1}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{prompt.title}</p>
                      </td>

                      <td>
                        <p className="mb-0 mt-4">{prompt.Difficulty}</p>
                      </td>

                      <td>
                        <p className="mb-0 mt-4">{new Date(prompt.createdAt).toLocaleTimeString()}</p>
                      </td>
                      <td>
                        <Link to={`/admin/promptEdit/${prompt.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-danger" />
                        </button>
                        </Link>
                        &nbsp;
                        <button onClick={()=>{deletePrompt(prompt.id)}} className="btn btn-md rounded-circle bg-light border mt-4">
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

export default PromptLists;