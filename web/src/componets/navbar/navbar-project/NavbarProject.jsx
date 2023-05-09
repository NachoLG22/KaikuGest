import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import projectsService from "../../../services/projects";
import { NavLink } from "react-router-dom";

function NavbarProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const project = await projectsService.detail(projectId);
        setProject(project);
      } catch (error) {
        console.error(error);
        const statusCode = error.response?.status;
        if (statusCode === 404) {
        }
      }
    }
    fetchProject();
  }, [projectId]);

  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-gray-800">
      <div className="flex items-center">
        {projectId && (
          <>
            <button className="ml-4 text-gray-300 hover:text-white">
              <NavLink to={`/projects/${projectId}`}>Project</NavLink>
            </button>
            <a href="#" className="ml-4 text-gray-300 hover:text-white">
              Budgets
            </a>
            <a href="#" className="ml-4 text-gray-300 hover:text-white">
              Invoices
            </a>
            <a href="#" className="ml-4 text-gray-300 hover:text-white">
              Costs
            </a>
            <h1 className="ml-4 text-gray-300 hover:text-white">
              {project.name}
            </h1>
          </>
        )}
        <h1>{project.name}</h1>
      </div>
    </nav>
  );
}

export default NavbarProject;

{
  /* <li>
              <a href={`/projects/${projectId}`}>Project</a>
            </li>
            <li>
              <a href={`/projects/${projectId}/budgets`}>Budgets</a>
            </li>
            <li>
              <a href={`/projects/${projectId}/invoices`}>Invoices</a>
            </li>
            <li>
              <a href={`/projects/${projectId}/costs`}>Costs</a>
            </li> */
}
