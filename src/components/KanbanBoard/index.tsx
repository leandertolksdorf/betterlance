import { toast } from "react-toastify";
import { useTasks } from "../../data/useTasks";
import { definitions } from "../../types/supabase";
import { Loading } from "../Loading";
import { KanbanBoardView } from "./view";

export type KanbanBoardProps = {
  projectId: definitions["project"]["id"];
};

export const KanbanBoard = (props: KanbanBoardProps) => {
  const { flat, update } = useTasks();
  const tasks = flat?.filter((task) => task.project === props.projectId);
  const todo = tasks?.filter((task) => task.state === "todo");
  const inProgress = tasks?.filter((task) => task.state === "in_progress");
  const done = tasks?.filter((task) => task.state === "done");
  const archived = tasks?.filter((task) => task.state === "archived");

  const onDropTask = async (
    taskId: string,
    state: definitions["task"]["state"],
    index: number
  ) => {
    toast.promise(update(taskId, { state, index }), {
      pending: "Aktualisieren...",
      success: "Aufgabe aktualisiert",
      error: "Fehler beim Aktualisieren",
    });
  };

  const isReady = tasks && todo && inProgress && done && archived;

  if (!isReady) {
    return <Loading />;
  }

  return (
    <KanbanBoardView
      todo={todo}
      inProgress={inProgress}
      done={done}
      archived={archived}
      onDropTask={onDropTask}
    />
  );
};
