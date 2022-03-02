import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { CreateOrEditCustomerFormView } from "./view";

export type CreateOrEditCustomerFormProps = {
  customer?: definitions["customer"];
};

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

export const CreateOrEditCustomerForm = (
  props: CreateOrEditCustomerFormProps
) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: props.customer,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from<definitions["customer"]>("customer")
        .upsert({ id: props.customer?.id, ...data });
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
    <CreateOrEditCustomerFormView
      isOpen={isOpen}
      onOpen={() => setIsOpen(!isOpen)}
      loading={loading}
      register={register}
      customer={props.customer}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
