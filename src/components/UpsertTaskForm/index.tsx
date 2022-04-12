import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useTasks } from "../../data/useTasks";
import { definitions } from "../../types/supabase";
import { UpsertTaskFormView } from "./view";

export type UpsertTaskFormProps = {
  projectId: definitions["project"]["id"];
  taskId?: definitions["task"]["id"];
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
  const [open, setOpen] = useState(false);

  const { get, insert, update } = useTasks();

  const defaultValues =
    (props.taskId && get(props.taskId, { flat: true })) || undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: props.taskId ? defaultValues : { project: props.projectId },
  });

  const onSubmit = handleSubmit(async (data) => {
    setOpen(false);
    if (props.taskId) {
      toast.promise(update(props.projectId, data), {
        pending: "Aktualisieren...",
        success: "Aufgabe aktualisiert",
        error: "Fehler beim Aktualisieren",
      });
      return;
    }
    toast.promise(insert(data), {
      pending: "Erstellen...",
      success: "Aufgabe erstellt",
      error: "Fehler beim Erstellen",
    });
    reset();
  });

  return (
    <UpsertTaskFormView
      projectId={props.projectId}
      taskId={props.taskId}
      open={open}
      setOpen={setOpen}
      register={register}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
