import React from "react";
import { CreateOrEditProjectForm } from "../CreateOrEditProjectForm";
import { Layout } from "../Layout";
import { ProjectList } from "../ProjectList";

export const ProjectListPageView = () => {
  return (
    <Layout
      showNavigation={true}
      title="Aufträge"
      subtitle="Hier kannst du alle deine Aufträge verwalten"
    >
      <CreateOrEditProjectForm />
      <ProjectList />
    </Layout>
  );
};
