import { NextPage } from "next";
import React from "react";
import { CustomerListPage } from "../../../components/CusomterListPage";
import { enforceAuthenticated } from "../../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const CustomerListRoute: NextPage = () => {
  return <CustomerListPage />;
};

export default CustomerListRoute;
