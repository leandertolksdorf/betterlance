import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useCustomers } from "../../data/useCustomers";
import { useProjects } from "../../data/useProjects";
import { definitions } from "../../types/supabase";
import { UpsertProjectFormView } from "./view";

export type UpsertProjectFormProps = {
  projectId?: string;
};

export type FormData = Omit<
  definitions["project"],
  "id" | "created_by" | "created_at"
>;

export const schema = yup
  .object({
    name: yup.string().required(),
    customer: yup.string().required(),
  })
  .required();

export const UpsertProjectForm = (props: UpsertProjectFormProps) => {
  const [open, setOpen] = useState(false);

  const { data: customers } = useCustomers();

  const { get, insert, update } = useProjects();

  const defaultValues =
    (props.projectId && get(props.projectId, { flat: true })) || undefined;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    setOpen(false);
    if (props.projectId) {
      toast.promise(update(props.projectId, data), {
        pending: "Aktualisieren...",
        success: "Projekt aktualisiert",
        error: "Fehler beim Aktualisieren",
      });
      return;
    }
    toast.promise(insert(data), {
      pending: "Erstellen...",
      success: "Projekt erstellt",
      error: "Fehler beim Erstellen",
    });
    reset();
  });

  return (
    <UpsertProjectFormView
      projectId={props.projectId}
      customers={customers}
      open={open}
      setOpen={setOpen}
      register={register}
      control={control}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
