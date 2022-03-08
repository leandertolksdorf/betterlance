import classNames from "classnames";
import { DOMAttributes, ReactNode } from "react";
import { IconButtonProps } from ".";

type IconButtonViewProps = IconButtonProps & {
  showText: boolean;
};

export const IconButtonView = (props: IconButtonViewProps) => {
  return (
    <div
      className={classNames(
        !props.alwaysShowText && props.showText && props.color === "red"
          ? classNames(
              "bg-red-200",
              "text-red-700",
              "hover:bg-red-300",
              "hover:text-red-900"
            )
          : classNames(
              "bg-black/10",
              "text-black/50",
              "hover:bg-primary-200",
              "active:text-primary-500"
            ),
        "p-2",
        "w-min",
        "flex",
        "justify-center",
        "items-center",
        "transition",
        "rounded-full",
        "text-xs",
        props.className
      )}
    >
      {props.text && (
        <div
          className={classNames(
            props.showText ? "max-w-xs" : "max-w-0",
            "transition-all",
            "w-auto",
            "truncate",
            "overflow-hidden",
            "uppercase",
            "font-bold"
          )}
        >
          {props.text}
        </div>
      )}
      <div className={classNames("w-4", "h-4")}>{props.icon}</div>
    </div>
  );
};
