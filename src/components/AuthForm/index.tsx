import { SupabaseClient } from "@supabase/supabase-js";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthFormView } from "./view";

export const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthFormView
      loading={loading}
      email={email}
      setEmail={setEmail}
      handleLogin={handleLogin}
    />
  );
};
