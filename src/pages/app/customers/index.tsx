import { Session } from "@supabase/supabase-js";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { CustomersPage } from "../../../components/CustomersPage";
import { Layout } from "../../../components/Layout";

const CustomerRoute: NextPage = () => {
  return <CustomersPage />;
};

export default CustomerRoute;
