import Link from "next/link";
import { DOMAttributes, ReactNode, useState } from "react";
import { IconButtonView } from "./view";

export type IconButtonProps = {
  className?: string;
  text?: string;
  icon: ReactNode;
  color?: "red";
  alwaysShowText?: boolean;
  href?: string;
  onClick?: () => void;
  onBlur?: DOMAttributes<HTMLButtonElement>["onBlur"];
};

export const IconButton = (props: IconButtonProps) => {
  const [showText, setShowText] = useState(props.alwaysShowText || false);

  const onClick = () => {
    if (props.onClick && showText) {
      props.onClick();
      return;
    }
    setShowText(props.alwaysShowText || true);
  };

  const onBlur = () => {
    if (props.alwaysShowText) return;
    setShowText(false);
  };

  if (props.href) {
    return (
      <Link href={props.href}>
        <a>
          <IconButtonView
            className={props.className}
            text={props.text}
            icon={props.icon}
            color={props.color}
            showText={showText}
          />
        </a>
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} onBlur={onBlur}>
        <IconButtonView
          className={props.className}
          text={props.text}
          icon={props.icon}
          color={props.color}
          showText={showText}
        />
      </button>
    );
  }
};
