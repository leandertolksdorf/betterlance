import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { KanbanBoardTaskProps } from ".";
import { TaskModal } from "../TaskModal";

type KanbanBoardTaskViewProps = KanbanBoardTaskProps & {};

export const KanbanBoardTaskView = (props: KanbanBoardTaskViewProps) => {
  const router = useRouter();
  return (
    <div className={classNames("pb-2")}>
      <div
        className={classNames(
          props.isOutside && props.isDropping && "hidden",
          props.isOutside && props.isDragging && "opacity-50",
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
          <Link
            href={router.asPath + "?taskId=" + props.task.id}
            passHref
            shallow={true}
            replace={true}
          >
            <a className={classNames("hover:underline")}>{props.task.title}</a>
          </Link>
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
