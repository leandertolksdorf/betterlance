import { NextPage } from "next";
import React from "react";
import { CustomerDetailPage } from "../../../components/CustomerDetailPage";
import { enforceAuthenticated } from "../../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const CustomerDetailRoute: NextPage = () => {
  return <CustomerDetailPage />;
};

export default CustomerDetailRoute;
