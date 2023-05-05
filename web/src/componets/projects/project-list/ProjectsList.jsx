import React from "react";
import ProjectItem from "../project-item/ProjectItem";

function ProjectsList({ projects }) {
  return (
    <>
      {projects.map((project) => (
        <ProjectItem project={project} key={project.id} />
      ))}
    </>
  );
}

export default ProjectsList;
