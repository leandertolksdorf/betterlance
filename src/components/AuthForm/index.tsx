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

  const signIn = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signIn(data);
    setLoading(false);
    if (error) throw error;
  };

  const onSubmit = handleSubmit(async (data: FormData) => {
    toast.promise(signIn(data), {
      pending: "Anmelden...",
      success: "Klicke auf den Link in deinen Emails, um dich anzumelden.",
      error: "Fehler beim Anmelden",
    });
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
