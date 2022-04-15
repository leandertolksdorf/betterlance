import classNames from "classnames";
import { TaskModalProps } from ".";
import { Task } from "../../types/composite";
import { Box } from "../Box";
import { Modal } from "../Modal";
import { Section } from "../Section";
import { UpsertTaskForm } from "../UpsertTaskForm";

export type TaskModalViewProps = TaskModalProps & {
  task?: Task | null;
};

const stateNames = {
  todo: "Offen",
  in_progress: "In Arbeit",
  done: "Erledigt",
  archived: "Archiviert",
};

export const TaskModalView = (props: TaskModalViewProps) => {
  if (!props.task) return <Modal open={props.open} onClose={props.onClose} />;
  return (
    <Modal open={props.open} onClose={props.onClose} title={props.task.title}>
      <div className={classNames("mb-2")}>
        <UpsertTaskForm
          projectId={props.task.project.id}
          taskId={props.task.id}
        />
        <Box>
          <h3>Titel</h3>
          <h3 className={classNames("text-black", "font-normal")}>
            {props.task.title}
          </h3>
        </Box>
        <Box>
          <h3>Beschreibung</h3>
          <h3 className={classNames("text-black", "font-normal")}>
            {props.task.description || "Keine Beschreibung"}
          </h3>
        </Box>
        <Box>
          <h3>Status</h3>
          <h3 className={classNames("text-black", "font-normal")}>
            {stateNames[props.task.state]}
          </h3>
        </Box>
      </div>
    </Modal>
  );
};
