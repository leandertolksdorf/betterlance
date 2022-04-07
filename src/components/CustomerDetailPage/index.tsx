import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCustomers } from "../../data/useCustomers";
import { useProjects } from "../../data/useProjects";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
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
