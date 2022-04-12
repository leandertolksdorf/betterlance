import classNames from "classnames";
import Link from "next/link";
import { Fragment } from "react";
import { KanbanBoardTaskProps } from ".";

type KanbanBoardTaskViewProps = KanbanBoardTaskProps & {};

export const KanbanBoardTaskView = (props: KanbanBoardTaskViewProps) => {
  return (
    <div className={classNames("pb-2")}>
      <div
        className={classNames(
          props.isDragging ? "bg-primary-500" : "bg-white",
          "transition",
          "rounded",
          "p-4",
          "text-sm",
          "select-none"
        )}
      >
        <div
          className={classNames(
            props.isDragging ? "text-white" : "text-primary-800",
            "transition",
            "font-bold"
          )}
        >
          {props.task.title}
        </div>
        {props.task.description && (
          <div
            className={classNames(
              props.isDragging ? "text-white" : "text-gray-500",
              "transition",
              "line-clamp-3",
              "mt-2"
            )}
          >
            {props.task.description.split("\n").map((line, i) => (
              <Fragment key={i}>
                {line} <br />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
