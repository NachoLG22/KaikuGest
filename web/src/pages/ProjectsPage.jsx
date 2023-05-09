import React, { useEffect, useState } from "react";
import PageLayout from "../componets/layout/PageLayout";
import ProjectsList from "../componets/projects/project-list/ProjectsList";
import projectsService from "../services/projects";
import { useSearchParams } from "react-router-dom";

function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const query = {};
    projectsService
      .list(query)
      .then((projects) => {
        setProjects(projects);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

  return (
    <PageLayout title="Show these awesome projects">
      <div className="w-full h-full p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-600">
        <div className="flex items-center justify-between mb-5">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Tus proyectos:
          </h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="max-h-50 overflow-auto hide-scroll-bar">
            <li className="py-3 sm:py-4">
              <ProjectsList projects={projects} />
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProjectsPage;
