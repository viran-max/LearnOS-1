import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import promptCategoryService from "../../../services/promptCategoryService";
import Swal from "sweetalert2";
import PromptVaultSubNav from "./PromptVaultSubNav";

const PromptCategoryLists = () => {

    const [categories,setCategories] = useState([]);

    async function getCategories(){
        let response = await promptCategoryService.getAll();
        setCategories(response);
    }

    async function deleteCategory(id){
      Swal.fire({
        title:"Are you sure ?",
        text : "Prompts under this category won't be deleted, but will lose their category link!",
        icon: "warning",
        showCancelButton:true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:"Yes, Delete it!"
      }).then(async(result)=>{
        if(result.isConfirmed){
          await promptCategoryService.deleteCategory(id)
          getCategories()
        }
      });

    }

    useEffect(()=>{
        getCategories();
    },[]);

  return (
    <>
    {/* header  */}
    <div className="container-xxl pt-5">
  <div className="container">
    <div className="aihub-page-header">
      <h2><i className="bi bi-tags"></i> All Categories</h2>
      <p>Manage existing prompt categories.</p>
    </div>
    <PromptVaultSubNav />
  </div>
</div>

      {/* Category Lists table  */}

      <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Edits</th>
                  </tr>
                </thead>
                <tbody>

                  {categories.map((category,index) => (
                    <tr key={category.id}>
                      <td>
                        <p className="mb-0 mt-4">{index + 1}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{category.name}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{category.status}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{new Date(category.createdAt).toLocaleTimeString()}</p>
                      </td>
                      <td>
                        <Link to={`/admin/promptVault/categoryEdit/${category.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-danger" />
                        </button>
                        </Link>
                        &nbsp;
                        <button onClick={()=>{deleteCategory(category.id)}} className="btn btn-md rounded-circle bg-light border mt-4">
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

export default PromptCategoryLists;