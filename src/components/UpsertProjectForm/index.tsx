import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCustomers } from "../../data/useCustomers";
import { useProjects } from "../../data/useProjects";
import { supabase } from "../../lib/supabase";
import { Project } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { Loading } from "../Loading";
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
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
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
    try {
      setOpen(false);
      if (props.projectId) {
        update({ id: props.projectId, ...data });
      } else {
        insert(data);
        reset();
      }
    } catch (error: any) {
      setError(true);
      setMessage(error.error_description || error.message);
    }
  });

  return (
    <UpsertProjectFormView
      projectId={props.projectId}
      error={error}
      message={message}
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
