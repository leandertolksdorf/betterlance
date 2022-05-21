import { useRouter } from "next/router";
import React from "react";
import { useCustomers } from "../../data/useCustomers";
import { ErrorPage } from "../ErrorPage";
import { LoadingPage } from "../LoadingPage";
import { CustomerDetailPageView } from "./view";

export const CustomerDetailPage = () => {
  const router = useRouter();

  const { get } = useCustomers();
  const customer = get(router.query.id as string);

  if (customer === null) return <ErrorPage />;
  if (customer === undefined) return <LoadingPage />;
  return <CustomerDetailPageView customer={customer} />;
};
