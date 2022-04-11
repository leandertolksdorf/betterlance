import useSWR, { Fetcher, Key } from "swr";
import { TaskDetailPage } from "../components/TaskDetailPage";
import { supabase } from "../lib/supabase";
import { Task } from "../types/composite";
import { definitions } from "../types/supabase";
import { useProjects } from "./useProjects";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { deleteHelper, insertHelper, updateHelper } from "../util/dataHelpers";

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
  params: Partial<definitions["task"]> & Pick<definitions["task"], "id">
) => {
  const { error } = await supabase
    .from<definitions["task"]>("task")
    .update(params)
    .eq("id", params.id);
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

const useTasks = () => {
  const { data, error, mutate } = useSWR(key, fetcher);

  const { get: getProject } = useProjects();

  const flat: definitions["task"][] | undefined = data?.map((task) => ({
    ...task,
    project: task.project.id,
  }));

  function get(id: string, options?: { flat: false }): Task;
  function get(id: string, options: { flat: true }): definitions["task"];
  function get(
    id: string,
    options?: {
      flat: boolean;
    }
  ) {
    if (!data || !flat) return undefined;
    if (options?.flat) {
      const task = flat.find((item) => item.id === id);
      if (!task) throw new Error("No task found with id " + id);
      return task;
    } else {
      const task = data.find((item) => item.id === id);
      if (!task) throw new Error("No task found with id " + id);
      return task;
    }
  }

  const insert = (params: Omit<definitions["task"], "id">) => {
    const publicTask = {
      ...params,
      title: params.title[0].toUpperCase() + params.title.slice(1),
      id: uuidv4(),
    };

    const project = getProject(params.project, { flat: true });

    if (!project || !data) {
      mutate(insertTask(publicTask));
      return;
    }

    const localTask: Task = {
      ...publicTask,
      project,
    };

    mutate(insertTask(publicTask), {
      optimisticData: insertHelper(data, localTask, "index"),
    });

    const update = (params: definitions["task"]) => {
      if (!data) {
        mutate(updateTask(params));
        return;
      }
      const localTask: Task = {
        ...get(params.id),
        ..._.omit(params, "project"),
      };

      mutate(updateTask(params), {
        optimisticData: updateHelper(data, localTask, "index"),
      });
    };

    const remove = (id: string) => {
      if (!data) {
        mutate(deleteTask(id));
        return;
      }

      mutate(deleteTask(id), {
        optimisticData: deleteHelper(data, id),
      });
    };

    return { data, flat, error, get, insert, update, remove };
  };
};
