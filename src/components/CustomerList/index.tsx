import React from "react";
import { useCustomers } from "../../data/useCustomers";
import { Error } from "../Error";
import { Loading } from "../Loading";
import { CustomerListView } from "./view";

export const CustomerList = () => {
  const { data: customers, error } = useCustomers();

  if (error) return <Error />;
  if (customers === undefined) return <Loading />;
  return <CustomerListView customers={customers} />;
};
