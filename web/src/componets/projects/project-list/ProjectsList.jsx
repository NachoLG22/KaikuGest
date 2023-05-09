import React from "react";
import ProjectItem from "../project-item/ProjectItem";

function ProjectsList({ projects }) {
  return (
    <>
      <div className="flex flex-col m-4 -mx-4 w-full h-screen overflow-y-scroll">
        {projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </div>
    </>
  );
}

export default ProjectsList;
