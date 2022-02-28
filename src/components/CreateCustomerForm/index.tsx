import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { CreateCustomerFormView } from "./view";

export type FormData = Omit<
  definitions["customer"],
  "id" | "created_by" | "created_at"
>;

export const schema = yup
  .object({
    name: yup.string().required(),
    company: yup.string(),
    email: yup.string().email(),
    address: yup.string(),
    zip: yup.string(),
    city: yup.string(),
    country: yup.string(),
  })
  .required();

export const CreateCustomerForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from<definitions["customer"]>("customer")
        .insert(data);
      if (error) throw error;
      reset();
      setIsOpen(false);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <CreateCustomerFormView
      isOpen={isOpen}
      onOpen={() => setIsOpen(!isOpen)}
      loading={loading}
      register={register}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
