import React from "react";
import { Layout } from "../Layout";
import { ProjectList } from "../ProjectList";
import { UpsertProjectForm } from "../UpsertProjectForm";

export const ProjectListPageView = () => {
  return (
    <Layout
      showNavigation={true}
      title="Aufträge"
      subtitle="Hier kannst du alle deine Aufträge verwalten"
    >
      <UpsertProjectForm />
      <ProjectList />
    </Layout>
  );
};
