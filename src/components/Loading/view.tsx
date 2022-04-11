import { CloudIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { LoadingProps } from ".";

export const LoadingView = (props: LoadingProps) => {
  return (
    <div
      className={classNames(
        props.className,
        "w-full",
        "p-4",
        "flex",
        "justify-center",
        "items-center",
        "bg-gray-100",
        "rounded"
      )}
    >
      <CloudIcon
        className={classNames(
          "w-12",
          "h-12",
          "text-primary-500",
          "animate-pulse"
        )}
      />
    </div>
  );
};
