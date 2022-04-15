import { useTasks } from "../../data/useTasks";
import { Error } from "../Error";
import { Loading } from "../Loading";
import { Modal } from "../Modal";
import { TaskModalView } from "./view";

export type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  taskId: string;
};

export const TaskModal = (props: TaskModalProps) => {
  const { get } = useTasks();
  const task = get(props.taskId);
  return <TaskModalView {...props} task={task} />;
};
