import classNames from "classnames";
import { ReactNode } from "react";
import { ButtonProps } from ".";

export const ButtonView = (props: ButtonProps) => {
  return (
    <button
      className={classNames(
        props.className,
        props.light && "light",
        "flex",
        props.center && "justify-center",
        "items-center"
      )}
    >
      {props.icon && (
        <div className={classNames("inline-icon", "mr-2")}>{props.icon}</div>
      )}
      {props.children}
    </button>
  );
};
