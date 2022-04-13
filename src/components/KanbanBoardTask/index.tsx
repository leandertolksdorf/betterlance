import { definitions } from "../../types/supabase";
import { KanbanBoardTaskView } from "./view";

export type KanbanBoardTaskProps = {
  isDragging: boolean;
  isOutside?: boolean;
  isDropping?: boolean;
  task: definitions["task"];
};
export const KanbanBoardTask = (props: KanbanBoardTaskProps) => {
  return <KanbanBoardTaskView {...props} />;
};
