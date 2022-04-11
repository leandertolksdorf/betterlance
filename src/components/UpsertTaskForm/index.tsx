import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { UpsertTaskFormView } from "./view";

export type UpsertTaskFormProps = {
  projectId: definitions["project"]["id"];
  task?: definitions["task"];
};

export type FormData = Omit<
  definitions["task"],
  "id" | "created_by" | "created_at"
>;

export const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export const UpsertTaskForm = (props: UpsertTaskFormProps) => {
  const [loading, setLoading] = useState(false); // TODO: remove
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { project: props.projectId, ...props.task },
  });

  const onSubmit = handleSubmit(async (data) => {
    // TODO: use useTasks() hook
    try {
      setError(false);
      setMessage(undefined);
      setLoading(true);
      const { error } = await supabase
        .from<definitions["task"]>("task")
        .upsert({ id: props.task?.id, ...data });
      if (error) throw error;
      if (!props.task) reset();
      setOpen(false);
    } catch (error: any) {
      setError(true);
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <UpsertTaskFormView
      projectId={props.projectId}
      loading={loading}
      error={error}
      message={message}
      open={open}
      setOpen={setOpen}
      register={register}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
