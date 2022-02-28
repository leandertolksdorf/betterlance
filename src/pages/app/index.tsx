import { NextPage } from "next";
import React from "react";
import { DashboardPage } from "../../components/DashboardPage";
import { enforceAuthenticated } from "../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const AppRoute: NextPage = () => {
  return <DashboardPage />;
};

export default AppRoute;
