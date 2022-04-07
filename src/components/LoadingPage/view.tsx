import { CloudIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { Loading } from "../Loading";

export const LoadingPageView = () => {
  return (
    <div
      className={classNames(
        "w-screen",
        "h-screen",
        "flex",
        "justify-center",
        "items-center",
        "bg-gray-100"
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
