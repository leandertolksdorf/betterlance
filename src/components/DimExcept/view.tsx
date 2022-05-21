import classNames from "classnames";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import { DimExceptProps } from ".";

export const DimExceptView = (props: DimExceptProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const styles = useSpring({
    to: {
      opacity: props.dim ? 0.4 : 0,
    },
    onStart: () => setIsTransitioning(true),
    onRest: () => setIsTransitioning(false),
  });
  return (
    <>
      <animated.div
        style={styles}
        className={classNames(
          "fixed",
          "inset-0",
          "bg-black",
          props.dim || isTransitioning ? "z-10" : "-z-10"
        )}
        onClick={props.onBlur}
      ></animated.div>
      <div
        className={classNames(
          "relative",
          (props.dim || isTransitioning) && "z-20"
        )}
      >
        {props.children}
      </div>
    </>
  );
};
