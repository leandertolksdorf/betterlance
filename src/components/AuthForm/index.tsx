import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError(false);
      setMessage(undefined);
      setLoading(true);
      const { error } = await supabase.auth.signIn(data, {
        redirectTo: "http://localhost:3000/app",
      });
      if (error) throw error;
      setMessage("Check' deine Emails für den Login-Link!");
    } catch (error: any) {
      console.log(error);
      setError(true);
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <AuthFormView
      loading={loading}
      error={error}
      message={message}
      register={register}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
