import classNames from "classnames";
import { BoxProps } from ".";

type BoxViewProps = BoxProps;

export const BoxView = (props: BoxProps) => {
  return (
    <div
      className={classNames(
        "bg-gray-100",
        "rounded",
        "mb-2",
        props.wrapsChild && "mr-2",
        props.wrapsChild ? "p-2" : "p-4",
        props.wrapsChild && "inline-block"
      )}
    >
      {props.title && (
        <div
          className={classNames(
            "font-bold",
            "uppercase",
            "text-primary-900",
            "text-sm"
          )}
        >
          {props.title}
        </div>
      )}
      {props.children}
    </div>
  );
};
