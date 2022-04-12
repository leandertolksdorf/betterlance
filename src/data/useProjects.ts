import _ from "lodash";
import useSWR, { Fetcher, Key } from "swr";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../lib/supabase";
import { Project } from "../types/composite";
import { definitions } from "../types/supabase";
import { deleteHelper, insertHelper, updateHelper } from "../util/dataHelpers";
import { useCustomers } from "./useCustomers";

const key: Key = "projects";

const fetcher: Fetcher<Project[]> = async () => {
  const { data, error } = await supabase
    .from<Project>("project")
    .select("*, customer(*)")
    .order("name");
  if (error) throw error;
  return data;
};

const insertProject = async (params: definitions["project"]) => {
  const { error } = await supabase
    .from<definitions["project"]>("project")
    .insert(params);
  if (error) throw error;
  return await fetcher();
};

const updateProject = async (
  params: Partial<definitions["project"]> & Pick<definitions["project"], "id">
) => {
  const { error } = await supabase
    .from<definitions["project"]>("project")
    .update(params)
    .eq("id", params.id);
  if (error) throw error;
  return await fetcher();
};

const deleteProject = async (id: definitions["project"]["id"]) => {
  const { error } = await supabase
    .from<definitions["project"]>("project")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return await fetcher();
};

export const useProjects = () => {
  const { data, error, mutate } = useSWR(key, fetcher);
  const { get: getCustomer } = useCustomers();

  const flat: definitions["project"][] | undefined = data?.map((project) => ({
    ...project,
    customer: project.customer.id,
  }));

  // Methods

  function get(id: string, options?: { flat: false }): Project;
  function get(id: string, options: { flat: true }): definitions["project"];
  function get(
    id: string,
    options?: {
      flat: boolean;
    }
  ) {
    if (!data || !flat) return undefined;
    if (options?.flat) {
      const project = flat.find((item) => item.id === id);
      if (!project) throw new Error("No project found with id " + id);
      return project;
    } else {
      const project = data.find((item) => item.id === id);
      if (!project) throw new Error("No project found with id " + id);
      return project;
    }
  }

  function insert(params: Omit<definitions["project"], "id">) {
    const publicProject = {
      ...params,
      name: params.name[0].toUpperCase() + params.name.slice(1),
      id: uuidv4(),
    };

    const customer = getCustomer(params.customer);

    if (!customer || !data) {
      mutate(insertProject(publicProject));
      return;
    }

    const localProject = {
      ...publicProject,
      customer,
    };

    mutate(insertProject(publicProject), {
      optimisticData: insertHelper(data, localProject, "name"),
    });
  }

  // TODO: separate id and update in arguments
  function update(params: definitions["project"]) {
    if (!data) {
      mutate(updateProject(params));
      return;
    }

    const localProject: Project = {
      ...get(params.id),
      ..._.omit(params, "customer"),
    };

    mutate(updateProject(params), {
      optimisticData: updateHelper(data, localProject, "name"),
    });
  }

  function remove(id: string) {
    if (!data) {
      mutate(deleteProject(id));
      return;
    }

    mutate(deleteProject(id), {
      optimisticData: deleteHelper(data, id),
    });
  }

  return { data, flat, error, get, insert, update, remove };
};
