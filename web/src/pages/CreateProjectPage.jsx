import React from "react";
import PageLayout from "../componets/layout/PageLayout";
import ProjectForm from "../componets/projects/project-form/ProjectForm";

function CreateProjectPage() {
  return (
    <PageLayout title="Create new project">
      <ProjectForm  />
    </PageLayout>
  );
}

export default CreateProjectPage;
