import React from "react";
import { Link } from "react-router-dom";

function ProjectItem({
  project: { id, title, description, date, projectNumber },
}) {
  return (
    <div className="mx-auto w-full max-w-sm m-3 bg-white border-2 border-gray-800 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 my-2 h-96">
      <div className="flex flex-col items-center pb-10 text-center">
        <h3 className="mb-1 mt-3 text-3xl font-medium text-gray-900 dark:text-white">
          {projectNumber}-{title}
        </h3>
        <span className="text-lg text-gray-500 dark:text-gray-400">{date}</span>
        <span className="text-lg text-gray-500 dark:text-gray-400">
          {description}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <Link to={`/projects/${id}`}>Detail</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
