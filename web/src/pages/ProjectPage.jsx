import React from "react";
import PageLayout from "../componets/layout/PageLayout";
import ProjectDetail from "../componets/projects/project-detail/ProjectDetail";

function ProjectPage() {
  return (
    <PageLayout title="Este es tu proyecto">
      <ProjectDetail />
    </PageLayout>
  );
}

export default ProjectPage;
