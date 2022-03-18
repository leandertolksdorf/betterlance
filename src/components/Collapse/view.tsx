import { PlusIcon, XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { CollapseProps } from ".";
import { Button } from "../Button";
import { DimExcept } from "../DimExcept";

type CollapseViewProps = CollapseProps;

export const CollapseView = (props: CollapseViewProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useLayoutEffect(() => {
    setInnerHeight(innerRef.current?.scrollHeight || 0);
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const styles = useSpring({
    to: {
      height: props.open ? innerHeight : 0,
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
          ref={innerRef}
          className={classNames(
            (!props.open || isTransitioning) && "overflow-hidden",
            "transition-[max-height]"
          )}
          style={styles}
        >
          {props.children}
        </animated.div>
      </div>
    </DimExcept>
  );
};
