import { useTasks } from "../../data/useTasks";
import { definitions } from "../../types/supabase";
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
    try {
      update(taskId, { state, index });
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  const isReady = tasks && todo && inProgress && done && archived;

  if (!isReady) {
    return <p>Loading</p>;
  } else {
    return (
      <KanbanBoardView
        todo={todo}
        inProgress={inProgress}
        done={done}
        archived={archived}
        onDropTask={onDropTask}
      />
    );
  }
};
