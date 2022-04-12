import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { supabase } from "../../lib/supabase";
import { AuthFormView } from "./view";

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
      toast.success("Check' deine Emails für den Login-Link!");
    } catch (error: any) {
      toast.error(error.error_description || error.message);
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
