import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useCustomers } from "../../data/useCustomers";
import { definitions } from "../../types/supabase";
import { UpsertCustomerFormView } from "./view";

export type UpsertCustomerFormProps = {
  customerId?: definitions["customer"]["id"];
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

export const UpsertCustomerForm = (props: UpsertCustomerFormProps) => {
  const [open, setOpen] = useState(false);

  const { get, insert, update } = useCustomers();

  const defaultValues =
    (props.customerId && get(props.customerId)) || undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    setOpen(false);
    if (props.customerId) {
      toast.promise(update(props.customerId, data), {
        pending: "Aktualisieren...",
        success: "Kund:in aktualisiert",
        error: "Fehler beim Aktualisieren",
      });
      return;
    }
    toast.promise(insert(data), {
      pending: "Erstellen...",
      success: "Kund:in erstellt",
      error: "Fehler beim Erstellen",
    });
    reset();
  });

  return (
    <UpsertCustomerFormView
      open={open}
      setOpen={setOpen}
      register={register}
      customerId={props.customerId}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
