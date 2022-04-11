import { useRouter } from "next/router";
import React from "react";
import { useProjects } from "../../data/useProjects";
import { ErrorPage } from "../ErrorPage";
import { LoadingPage } from "../LoadingPage";
import { ProjectDetailPageView } from "./view";

export const ProjectDetailPage = () => {
  const router = useRouter();

  const { get } = useProjects();
  const project = get(router.query.id as string);

  if (project === null) return <ErrorPage />;
  if (project === undefined) return <LoadingPage />;
  return <ProjectDetailPageView project={project} />;
};
