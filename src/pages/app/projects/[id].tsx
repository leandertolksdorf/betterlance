import { NextPage } from "next";
import React from "react";
import { ProjectDetailPage } from "../../../components/ProjectDetailPage";
import { enforceAuthenticated } from "../../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const ProjectDetailRoute: NextPage = () => {
  return <ProjectDetailPage />;
};

export default ProjectDetailRoute;
