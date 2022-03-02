import classNames from "classnames";
import { useState } from "react";
import { DimExceptProps } from ".";

export const DimExceptView = (props: DimExceptProps) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);
  const onTransitionEnd = () => {
    setHasTransitionedIn(props.dim);
  };
  return (
    <>
      <div
        onTransitionEnd={onTransitionEnd}
        className={classNames(
          "fixed",
          "inset-0",
          "transition",
          "ease-in-out",
          "bg-black",
          props.dim ? "opacity-50" : "opacity-0",
          props.dim || hasTransitionedIn ? "z-10" : "-z-10"
        )}
      ></div>
      <div
        className={classNames(
          "relative",
          props.dim || hasTransitionedIn ? "z-20" : null
        )}
      >
        {props.children}
      </div>
    </>
  );
};
