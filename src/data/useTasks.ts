import _ from "lodash";
import useSWR, { Fetcher, Key } from "swr";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../lib/supabase";
import { Task } from "../types/composite";
import { definitions } from "../types/supabase";
import { deleteHelper, insertHelper, updateHelper } from "../util/dataHelpers";
import { useProjects } from "./useProjects";

const key: Key = "tasks";

const fetcher: Fetcher<Task[]> = async () => {
  const { data, error } = await supabase
    .from<Task>("task")
    .select("*, project(*)")
    .order("index");
  if (error) throw error;
  return data;
};

const insertTask = async (params: definitions["task"]) => {
  const { error } = await supabase
    .from<definitions["task"]>("task")
    .insert(params);

  if (error) throw error;
  return await fetcher();
};

const updateTask = async (
  id: definitions["task"]["id"],
  update: Omit<Partial<definitions["task"]>, "id">
) => {
  const { error } = await supabase
    .from<definitions["task"]>("task")
    .update(update)
    .eq("id", id);
  if (error) throw error;
  return await fetcher();
};

const deleteTask = async (id: definitions["task"]["id"]) => {
  const { error } = await supabase
    .from<definitions["task"]>("task")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return await fetcher();
};

export const useTasks = () => {
  const { data, error, mutate } = useSWR(key, fetcher);

  const { get: getProject } = useProjects();

  const flat: definitions["task"][] | undefined = data?.map((task) => ({
    ...task,
    project: task.project.id,
  }));

  function get(id: string, options?: { flat: false }): Task | null | undefined;
  function get(
    id: string,
    options: { flat: true }
  ): definitions["task"] | null | undefined;
  function get(
    id: string,
    options?: {
      flat: boolean;
    }
  ) {
    if (!data || !flat) return undefined;
    if (options?.flat) {
      const task = flat.find((item) => item.id === id);
      if (!task) return null;
      return task;
    } else {
      const task = data.find((item) => item.id === id);
      if (!task) return null;
      return task;
    }
  }

  async function insert(params: Omit<definitions["task"], "id">) {
    const publicTask: definitions["task"] = {
      ...params,
      id: uuidv4(),
      title: params.title[0].toUpperCase() + params.title.slice(1),
    };

    const project = getProject(params.project, { flat: true });

    if (!project || !data) {
      await mutate(insertTask(publicTask));
      return;
    }

    const localTask: Task = {
      ...publicTask,
      project,
      state: "todo",
      index: -1,
    };

    await mutate(insertTask(publicTask), {
      optimisticData: insertHelper(data, localTask, "index"),
    });
  }

  async function update(
    id: definitions["task"]["id"],
    update: Omit<Partial<definitions["task"]>, "id">
  ) {
    const oldTask = get(id);
    if (!data || !oldTask) {
      await mutate(updateTask(id, update));
      return;
    }
    const localTask: Task = {
      ...oldTask,
      ..._.omit(update, "project"),
      ...(update.index && {
        index: update.index + (update.index > oldTask.index ? 0.5 : -0.5),
      }),
    };
    await mutate(updateTask(id, update), {
      optimisticData: updateHelper(data, localTask, "index"),
    });
  }

  async function remove(id: string) {
    if (!data) {
      await mutate(deleteTask(id));
      return;
    }

    await mutate(deleteTask(id), {
      optimisticData: deleteHelper(data, id),
    });
  }
  return { data, flat, error, get, insert, update, remove };
};
