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
  id: definitions["project"]["id"],
  update: Omit<Partial<definitions["project"]>, "id">
) => {
  const { error } = await supabase
    .from<definitions["project"]>("project")
    .update(update)
    .eq("id", id);
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

  function get(
    id: string,
    options?: { flat: false }
  ): Project | null | undefined;
  function get(
    id: string,
    options: { flat: true }
  ): definitions["project"] | null | undefined;
  function get(
    id: string,
    options?: {
      flat: boolean;
    }
  ) {
    if (!data || !flat) return undefined;
    if (options?.flat) {
      const project = flat.find((item) => item.id === id);
      if (!project) return null;
      return project;
    } else {
      const project = data.find((item) => item.id === id);
      if (!project) return null;
      return project;
    }
  }

  async function insert(params: Omit<definitions["project"], "id">) {
    const publicProject = {
      ...params,
      name: params.name[0].toUpperCase() + params.name.slice(1),
      id: uuidv4(),
    };

    const customer = getCustomer(params.customer);

    if (!customer || !data) {
      await mutate(insertProject(publicProject));
      return;
    }

    const localProject = {
      ...publicProject,
      customer,
    };

    await mutate(insertProject(publicProject), {
      optimisticData: insertHelper(data, localProject, "name"),
    });
  }

  async function update(
    id: definitions["project"]["id"],
    update: Omit<Partial<definitions["project"]>, "id">
  ) {
    const oldProject = get(id);
    if (!data || !oldProject) {
      await mutate(updateProject(id, update));
      return;
    }

    const localProject: Project = {
      ...oldProject,
      ..._.omit(update, "customer"),
    };

    await mutate(updateProject(id, update), {
      optimisticData: updateHelper(data, localProject, "name"),
    });
  }

  async function remove(id: string) {
    if (!data) {
      await mutate(deleteProject(id));
      return;
    }

    await mutate(deleteProject(id), {
      optimisticData: deleteHelper(data, id),
    });
  }

  return { data, flat, error, get, insert, update, remove };
};
