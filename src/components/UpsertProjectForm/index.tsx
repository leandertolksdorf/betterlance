import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { UpsertProjectFormView } from "./view";

export type UpsertProjectFormProps = {
  project?: definitions["project"];
};

export type FormData = Omit<
  definitions["project"],
  "id" | "created_by" | "created_at"
>;

export const schema = yup
  .object({
    name: yup.string().required(),
    customer: yup
      .string()
      .transform((value) => (value.value === "" ? undefined : value.value)),
  })
  .required();

export const UpsertProjectForm = (props: UpsertProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const [customers, setCustomers] = useState<definitions["customer"][] | null>(
    null
  );

  const loadCustomers = async () => {
    try {
      setError(false);
      setMessage(undefined);
      setLoading(true);
      const { data, error } = await supabase
        .from<definitions["customer"]>("customer")
        .select()
        .order("name");
      if (error) throw error;
      setCustomers(data || []);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
    const subscription = supabase
      .from<definitions["customer"]>("customer")
      .on("*", loadCustomers)
      .subscribe();
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: props.project,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError(false);
      setMessage(undefined);
      setLoading(true);
      const { error } = await supabase
        .from<definitions["project"]>("project")
        .upsert({ id: props.project?.id, ...data });
      if (error) throw error;
      if (!props.project) reset();
      setOpen(false);
    } catch (error: any) {
      setError(true);
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <UpsertProjectFormView
      loading={loading}
      error={error}
      message={message}
      customers={customers}
      open={open}
      setOpen={setOpen}
      register={register}
      control={control}
      project={props.project}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
