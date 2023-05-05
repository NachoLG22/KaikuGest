import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import projectsService from "../../../services/projects";
import BudgetList from "../../budgets/buddets-list/BudgetList";
import CreateBudgetPage from "../../../pages/CreateBudgetPage";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState();
  const [activeTab, setActiveTab] = useState("project");

  useEffect(() => {
    async function fetchProject() {
      try {
        const project = await projectsService.detail(projectId);
        setProject(project);
      } catch (error) {
        console.error(error);
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          navigate("/projects");
        }
      }
    }
    fetchProject();
  }, [projectId]);

  return (
    <>
      <div className="flex justify-auto w-full border border-gray-800 bg-gray-100 hover:bg-white-200 transition duration-300 rounded-md shadow-md">
        <ul className="flex">
          <li className="border border-gray-800 mr-1">
            <button
              className={`${
                activeTab === "project"
                  ? "border border-gray-800  bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-600"
              } rounded-t-md py-2 px-4 text-lg font-bold`}
              onClick={() => setActiveTab("project")}
            >
              Project Details
            </button>
          </li>
          <li className="border border-gray-800 mr-1">
            <button
              className={`${
                activeTab === "budgets"
                  ? "border border-gray-800  bg-gray-800  text-white"
                  : "bg-gray-200 text-gray-600"
              } rounded-t-md py-2 px-4 text-lg font-bold`}
              onClick={() => setActiveTab("budgets")}
            >
              Budgets
            </button>
          </li>
          <li className="border border-gray-800 mr-1">
            <button
              className={`${
                activeTab === "invoices"
                  ? "border border-gray-800  bg-gray-800  text-white"
                  : "bg-gray-200 text-gray-600"
              } rounded-t-md py-2 px-4 text-lg font-bold`}
              onClick={() => setActiveTab("invoices")}
            >
              Invoices
            </button>
          </li>
          <li className="border border-gray-800 mr-1">
            <button
              className={`${
                activeTab === "cost"
                  ? "border border-gray-800  bg-gray-800  text-white"
                  : "bg-gray-200 text-gray-600"
              } rounded-t-md py-2 px-4 text-lg font-bold`}
              onClick={() => setActiveTab("cost")}
            >
              Cost
            </button>
          </li>
        </ul>
      </div>
      <div className="card border-gray-800 w-full">
        <div
          className={`card-body w-full ${
            activeTab === "project" ? "" : "hidden"
          }`}
        >
          {!project ? (
            <p>
              <i className="fa fa-gear fa-spin"></i>Loading...
            </p>
          ) : (
            <>
              <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
                <div>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.projectNumber}-{project.title}
                  </h5>
                </div>
                <h6 class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {project.description}.
                </h6>
              </div>
              <br />
              <Link to={`/projects/${project.id}/budget`}>
                <button>New Budget</button>
              </Link>
            </>
          )}
        </div>
        <div className={`card-body ${activeTab === "budgets" ? "" : "hidden"}`}>
          <h2>Budgets</h2>
          <BudgetList />
        </div>
        <div
          className={`card-body ${activeTab === "invoices" ? "" : "hidden"}`}
        >
          <h2>Invoices</h2>
        </div>
        <div className={`card-body ${activeTab === "cost" ? "" : "hidden"}`}>
          <h2>Cost</h2>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
