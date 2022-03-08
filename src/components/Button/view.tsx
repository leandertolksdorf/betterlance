import classNames from "classnames";
import Link from "next/link";
import { ButtonProps } from ".";

export const ButtonView = (props: ButtonProps) => {
  return (
    <div
      className={classNames(
        props.className,
        props.light
          ? classNames(
              "bg-gray-100",
              "hover:bg-gray-200",
              "active:bg-gray-300",
              "text-primary-500"
            )
          : classNames(
              "bg-primary-500",
              "hover:bg-primary-600",
              "active:bg-primary-700",
              "text-white"
            ),
        props.center && "justify-center",
        "w-full",
        "flex",
        "items-center",
        "cursor-pointer",
        "select-none",
        "transition",
        "uppercase",
        "px-4",
        "py-2",
        "rounded",
        "font-bold"
      )}
    >
      {props.icon && (
        <div className={classNames("inline-icon", "mr-2")}>{props.icon}</div>
      )}
      {props.children}
    </div>
  );
};
