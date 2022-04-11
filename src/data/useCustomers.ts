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

const updateCustomer = async (params: definitions["customer"]) => {
  const { error } = await supabase
    .from<definitions["customer"]>("customer")
    .update(params)
    .eq("id", params.id);
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

  const get = (id: string) => {
    if (!data) return undefined;
    return data.find((item) => item.id === id) || null;
  };

  const insert = (params: Omit<definitions["customer"], "id">) => {
    const publicCustomer = {
      ...params,
      name: params.name[0].toUpperCase() + params.name.slice(1),
      id: uuidv4(),
    };

    if (!data) {
      mutate(insertCustomer(publicCustomer));
      return;
    }

    const localCustomer = publicCustomer;
    mutate(insertCustomer(publicCustomer), {
      optimisticData: insertHelper(data, localCustomer, "name"),
    });
  };

  // TODO: separate id and update in arguments
  const update = (params: definitions["customer"]) => {
    if (!data) {
      mutate(updateCustomer(params));
      return;
    }

    mutate(updateCustomer(params), {
      optimisticData: updateHelper(data, params, "name"),
    });
  };

  const remove = (id: string) => {
    if (!data) {
      mutate(deleteCustomer(id));
      return;
    }

    mutate(deleteCustomer(id), {
      optimisticData: deleteHelper(data, id),
    });
  };

  return { data, error, get, insert, update, remove };
};
