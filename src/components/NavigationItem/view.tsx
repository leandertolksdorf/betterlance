import classNames from "classnames";
import Link from "next/link";
import React, { ReactNode } from "react";
import { NavigationItemProps } from ".";

type NavigationItemViewProps = NavigationItemProps & {
  isActive: boolean;
};

export const NavigationItemView = (props: NavigationItemViewProps) => {
  return (
    <Link href={props.href || ""} passHref>
      <a
        onClick={props.onClick}
        className={classNames(
          "block",
          "px-4",
          "py-2",
          "transition",
          props.isActive && "bg-primary-100",
          props.isActive && "text-primary-500",
          "hover:bg-gray-100",
          "active:bg-primary-100",
          "active:text-primary-500",
          "rounded",
          "mb-1",
          "flex",
          "justify-between",
          "items-center"
        )}
      >
        {props.title}
        <div className={classNames("w-5", "h-5")}>{props.icon}</div>
      </a>
    </Link>
  );
};
