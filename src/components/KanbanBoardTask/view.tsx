import classNames from "classnames";
import { useSpring, animated, config } from "react-spring";
import { KanbanBoardTaskProps } from ".";

type KanbanBoardTaskViewProps = KanbanBoardTaskProps & {};

export const KanbanBoardTaskView = (props: KanbanBoardTaskViewProps) => {
  return (
    <div className={classNames("pb-2")}>
      <div
        className={classNames(
          props.isDragging
            ? "border-primary-500 bg-primary-100"
            : "border-gray-300 bg-white",
          "border-2",
          "rounded",
          "p-4",
          "text-sm",
          "select-none"
        )}
      >
        <div className={classNames("font-bold", "text-primary-800")}>
          {props.task.title}
        </div>
      </div>
    </div>
  );
};
