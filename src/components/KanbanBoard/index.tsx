import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { KanbanBoardView } from "./view";
import _, { update } from "lodash";

export type KanbanBoardProps = {
  projectId: definitions["project"]["id"];
};

export const KanbanBoard = (props: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<definitions["task"][] | undefined>(
    undefined
  );
  const [todo, setTodo] = useState<definitions["task"][] | undefined>(
    undefined
  );
  const [inProgress, setInProgress] = useState<
    definitions["task"][] | undefined
  >(undefined);
  const [done, setDone] = useState<definitions["task"][] | undefined>(
    undefined
  );

  useEffect(() => {
    loadTasks();
    const subscription = supabase
      .from<definitions["task"]>("task")
      .on("*", _.debounce(loadTasks, 500))
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from<definitions["task"]>("task")
        .select("*")
        .eq("project", props.projectId)
        .order("index");
      if (error) throw error;
      setTasks(data || null);
      setTodo(data.filter((task) => task.state === "todo"));
      setInProgress(data.filter((task) => task.state === "in_progress"));
      setDone(data.filter((task) => task.state === "done"));
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
    }
  };

  const isReady = tasks && todo && inProgress && done;
  const onDropTask = async (
    taskId: string,
    state: definitions["task"]["state"],
    index: number
  ) => {
    if (isReady) {
      const updatedTask = tasks.find((task) => task.id === taskId);
      if (!updatedTask) return;
      updatedTask!.state = state;

      const filteredTodo = todo.filter((task) => task.id !== taskId);
      setTodo(filteredTodo);
      const filteredInProgress = inProgress.filter(
        (task) => task.id !== taskId
      );
      setInProgress(filteredInProgress);
      const filteredDone = done.filter((task) => task.id !== taskId);
      setDone(filteredDone);
      switch (state) {
        case "todo":
          const newTodo = filteredTodo;
          newTodo.splice(index, 0, updatedTask);
          setTodo(newTodo);
          break;
        case "in_progress":
          const newInProgress = filteredInProgress;
          newInProgress.splice(index, 0, updatedTask);
          setInProgress(newInProgress);
          break;
        case "done":
          const newDone = filteredDone;
          newDone.splice(index, 0, updatedTask);
          setDone(newDone);
          break;
      }

      try {
        const { data, error } = await supabase
          .from<definitions["task"]>("task")
          .update({ state, index })
          .eq("id", taskId);
        if (error) throw error;
      } catch (error: any) {
        alert(error.error_description || error.message);
      } finally {
      }
    }
  };

  if (!isReady) {
    return <p>Loading</p>;
  } else {
    return (
      <KanbanBoardView
        todo={todo}
        inProgress={inProgress}
        done={done}
        onDropTask={onDropTask}
      />
    );
  }
};
