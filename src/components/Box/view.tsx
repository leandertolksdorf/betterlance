import classNames from "classnames";
import { ReactNode } from "react";
import { BoxProps } from ".";

type BoxViewProps = BoxProps;

export const BoxView = (props: BoxProps) => {
  return (
    <div className={classNames("bg-gray-100", "rounded", "p-4")}>
      {props.children}
    </div>
  );
};
