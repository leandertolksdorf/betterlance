import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
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
          "p-4",
          "shadow-xl",
          "shadow-black"
        )}
        style={styles}
      >
        <div
          className={classNames("flex", "justify-between", "items-end", "mb-2")}
        >
          <h1 className={classNames()}>{props.title}</h1>
          <IconButton
            icon={<XIcon />}
            text="Schließen"
            onClick={props.onClose}
            alwaysShowText
          />
        </div>
        {props.children}
      </animated.div>
    </DimExcept>
  );
};
