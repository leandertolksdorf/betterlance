import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import { CustomerDetailPage } from "../../../components/CustomerDetailPage";
import { CustomerListPage } from "../../../components/CustomerListPage";
import { enforceAuthenticated } from "../../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const CustomerDetailRoute: NextPage = () => {
  return <CustomerDetailPage />;
};

export default CustomerDetailRoute;
