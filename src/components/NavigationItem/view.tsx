import classNames from "classnames";
import React from "react";
import { NavigationItemProps } from ".";

type NavigationItemViewProps = NavigationItemProps & {
  isActive: boolean;
};

export const NavigationItemView = (props: NavigationItemViewProps) => {
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        "block",
        "px-4",
        "py-2",
        "transition",
        "cursor-pointer",
        props.isActive
          ? classNames("bg-primary-100", "text-primary-500")
          : classNames(
              "hover:bg-gray-100",
              "active:bg-primary-100",
              "active:text-primary-500"
            ),
        "rounded",
        "mb-1",
        "flex",
        "justify-between",
        "items-center"
      )}
    >
      {props.title}
      <div className={classNames("w-5", "h-5")}>{props.icon}</div>
    </div>
  );
};
