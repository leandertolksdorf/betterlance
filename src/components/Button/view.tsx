import { CloudIcon } from "@heroicons/react/solid";
import classNames from "classnames";
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
        props.loading ? "cursor-progress" : "cursor-pointer",
        "select-none",
        "transition",
        "uppercase",
        "px-4",
        "py-2",
        "rounded",
        "font-bold"
      )}
    >
      <div
        className={classNames(
          props.loading ? "w-[1em] mr-1 opacity-100" : "w-0 opacity-0",
          "transition-[width]"
        )}
      >
        {props.loading && <CloudIcon className={classNames("animate-pulse")} />}
      </div>
      {props.children}
    </div>
  );
};
