import { NextPage } from "next";
import React from "react";
import { CustomersPage } from "../../../components/CustomersPage";
import { enforceAuthenticated } from "../../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const CustomerRoute: NextPage = () => {
  return <CustomersPage />;
};

export default CustomerRoute;
