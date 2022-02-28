import { yupResolver } from "@hookform/resolvers/yup";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { AuthFormView } from "./view";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export type FormData = {
  email: string;
};

export const schema = yup
  .object({ email: yup.string().email().required() })
  .required();

export const AuthForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(data, {
        redirectTo: "http://localhost:3000/app",
      });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <AuthFormView
      loading={loading}
      register={register}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
