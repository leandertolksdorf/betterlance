import { Session } from "@supabase/supabase-js";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { DashboardPage } from "../../components/DashboardPage";
import { AuthPage } from "../../components/AuthPage";
import { supabase } from "../../lib/supabase";

const AppRoute: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return !session ? <AuthPage /> : <DashboardPage />;
};

export default AppRoute;
