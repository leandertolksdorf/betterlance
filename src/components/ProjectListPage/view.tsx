import React from "react";
import { UpsertProjectForm } from "../UpsertProjectForm";
import { Layout } from "../Layout";
import { ProjectList } from "../ProjectList";

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
