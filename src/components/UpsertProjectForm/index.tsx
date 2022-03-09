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
      .transform((value) => (value === "" ? undefined : value)),
  })
  .required();

export const UpsertProjectForm = (props: UpsertProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [customers, setCustomers] = useState<definitions["customer"][] | null>(
    null
  );

  const loadCustomers = async () => {
    try {
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: props.project,
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const { error } = await supabase
        .from<definitions["project"]>("project")
        .upsert({ id: props.project?.id, ...data });
      if (error) throw error;
      if (!props.project) reset();
      setIsOpen(false);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <UpsertProjectFormView
      customers={customers}
      isOpen={isOpen}
      onOpen={() => setIsOpen(!isOpen)}
      loading={loading}
      register={register}
      project={props.project}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};
