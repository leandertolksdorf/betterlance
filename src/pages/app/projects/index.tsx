import { NextPage } from "next";
import React from "react";

import { ProjectListPage } from "../../../components/ProjectListPage";
import { enforceAuthenticated } from "../../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const ProjectListRoute: NextPage = () => {
  return <ProjectListPage />;
};

export default ProjectListRoute;
