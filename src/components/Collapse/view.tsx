import { PlusIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { CollapseProps } from ".";
import { Button } from "../Button";
import { DimExcept } from "../DimExcept";

type CollapseViewProps = CollapseProps;

export const CollapseView = (props: CollapseViewProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    handleInnerSize();
    window.addEventListener("resize", handleInnerSize);

    return () => window.removeEventListener("resize", handleInnerSize);
  }, []);

  const handleInnerSize = () => {
    if (!innerRef.current) return;
    setInnerHeight(innerRef.current.offsetHeight || 0);
  };

  const [isTransitioning, setIsTransitioning] = useState(false);

  const styles = useSpring({
    to: {
      height: props.open ? innerHeight : 0,
      opacity: props.open ? 1 : 0,
    },
    onStart: () => setIsTransitioning(true),
    onRest: () => setIsTransitioning(false),
  });

  return (
    <DimExcept dim={props.open && !!props.dim}>
      <div className={classNames("bg-gray-100", "rounded-lg", "my-2")}>
        <Button
          light={props.open}
          onClick={props.onPressButton}
          icon={
            <PlusIcon
              className={classNames(
                props.open && "rotate-45 scale-[120%]",
                "transition"
              )}
            />
          }
        >
          {props.open ? props.closeText : props.openText}
        </Button>
        <animated.div
          className={classNames(
            (!props.open || isTransitioning) && "overflow-hidden",
            "transition-[max-height]"
          )}
          style={styles}
        >
          <div ref={innerRef}>{props.children}</div>
        </animated.div>
      </div>
    </DimExcept>
  );
};
