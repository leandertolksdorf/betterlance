import useSWR, { Fetcher, Key } from "swr";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";

const key: Key = "customers";

const fetcher: Fetcher<definitions["customer"][]> = async () => {
  const { data, error } = await supabase
    .from<definitions["customer"]>("customer")
    .select()
    .order("name");

  if (error) throw error;
  return data;
};

export const useCustomers = () => {
  const { data, error, mutate } = useSWR(key, fetcher);

  // Methods

  const get = (id: string) => {
    if (!data) return undefined;
    return data.find((item) => item.id === id) || null;
  };
  // TODO: insert()
  // TODO: update()
  // TODO: delete()

  // Variants

  return { data, error, get };
};
