import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { ModalProps } from ".";
import { DimExcept } from "../DimExcept";
import { IconButton } from "../IconButton";

type ModalViewProps = ModalProps;

export const ModalView = (props: ModalViewProps) => {
  const styles = useSpring({
    to: {
      x: props.open ? "0%" : "100%",
      opacity: props.open ? "100%" : "0%",
    },
  });
  return (
    <DimExcept dim={props.open} onBlur={props.onClose}>
      <animated.div
        className={classNames(
          "fixed",
          "top-0",
          "right-0",
          "h-screen",
          "w-1/4",
          "bg-gray-200",
          "shadow-xl",
          "shadow-black",
          "overflow-y-scroll"
        )}
        style={styles}
      >
        <div
          className={classNames(
            "flex",
            "justify-between",
            "items-end",
            "mb-4",
            "sticky",
            "top-0",
            "bg-gray-200",
            "p-4",
            "z-10"
          )}
        >
          <h1 className={classNames()}>{props.title}</h1>
          <IconButton
            icon={<XIcon />}
            text="Schließen"
            onClick={props.onClose}
            alwaysShowText
          />
        </div>
        <div className={classNames("px-4")}>{props.children}</div>
      </animated.div>
    </DimExcept>
  );
};
