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
        "animation-pulse",
        "bg-gray-100",
        "rounded"
      )}
    >
      <div className={classNames("relative", "w-8", "h-8")}>
        <CloudIcon
          className={classNames(
            "absolute",
            "w-8",
            "h-8",
            "text-primary-500",
            "z-10"
          )}
        />
        <CloudIcon
          className={classNames(
            "absolute",
            "w-8",
            "h-8",
            "animate-ping",
            "text-primary-300"
          )}
        />
      </div>
    </div>
  );
};
