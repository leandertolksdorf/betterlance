import useSWR, { Fetcher, Key } from "swr";
import { supabase } from "../lib/supabase";
import { definitions } from "../types/supabase";
import { v4 as uuidv4 } from "uuid";
import { deleteHelper, insertHelper, updateHelper } from "../util/dataHelpers";
import { detachRefs } from "@react-spring/core/dist/declarations/src/helpers";

const key: Key = "customers";

const fetcher: Fetcher<definitions["customer"][]> = async () => {
  const { data, error } = await supabase
    .from<definitions["customer"]>("customer")
    .select()
    .order("name");

  if (error) throw error;
  return data;
};

const insertCustomer = async (params: definitions["customer"]) => {
  const { error } = await supabase
    .from<definitions["customer"]>("customer")
    .insert(params);
  if (error) throw error;
  return await fetcher();
};

const updateCustomer = async (
  id: definitions["customer"]["id"],
  update: Partial<Omit<definitions["customer"], "id">>
) => {
  const { error } = await supabase
    .from<definitions["customer"]>("customer")
    .update(update)
    .eq("id", id);
  if (error) throw error;
  return await fetcher();
};

const deleteCustomer = async (id: string) => {
  const { error } = await supabase
    .from<definitions["customer"]>("customer")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return await fetcher();
};

export const useCustomers = () => {
  const { data, error, mutate } = useSWR(key, fetcher);

  // Methods
  function get(id: string) {
    if (!data) return undefined;
    const customer = data.find((item) => item.id === id);
    if (!customer) return null;
    return customer;
  }

  async function insert(params: Omit<definitions["customer"], "id">) {
    const publicCustomer = {
      ...params,
      name: params.name[0].toUpperCase() + params.name.slice(1),
      id: uuidv4(),
    };

    if (!data) {
      await mutate(insertCustomer(publicCustomer));
      return;
    }

    const localCustomer = publicCustomer;
    await mutate(insertCustomer(publicCustomer), {
      optimisticData: insertHelper(data, localCustomer, "name"),
    });
  }

  async function update(
    id: definitions["customer"]["id"],
    update: Partial<Omit<definitions["customer"], "id">>
  ) {
    if (!data) {
      await mutate(updateCustomer(id, update));
      return;
    }

    await mutate(updateCustomer(id, update), {
      optimisticData: updateHelper(data, { id, ...update }, "name"),
    });
  }

  async function remove(id: string) {
    if (!data) {
      await mutate(deleteCustomer(id));
      return;
    }

    await mutate(deleteCustomer(id), {
      optimisticData: deleteHelper(data, id),
    });
  }

  return { data, error, get, insert, update, remove };
};
