import { Session } from "@supabase/supabase-js";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { AuthPage } from "../components/AuthPage";

const AppRoute: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {}, []);
  return <AuthPage />;
};

export default AppRoute;
