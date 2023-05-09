import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import projectsService from "../../../services/projects";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState();
  const [budgets, setBudgets] = useState([]);
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
                <p>{project.date}</p>
              </div>
              <br />
              <div className="flex justify-between">
                <button className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <Link to={`/projects/${project.id}/budget`}>New Budget</Link>
                </button>

                <button className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                  <NavLink to={`/projects/${project.id}/budgets`}>
                    Budgets
                  </NavLink>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
