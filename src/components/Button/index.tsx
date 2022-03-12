import classNames from "classnames";
import Link from "next/link";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { ButtonView } from "./view";

export type ButtonProps = {
  className?: string;
  href?: string;
  onClick?: MouseEventHandler;
  icon?: ReactNode;
  light?: boolean;
  center?: boolean;
  loading?: boolean;
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export const Button = (props: ButtonProps) => {
  if (props.href) {
    return (
      <Link href={props.href}>
        <ButtonView {...props} />
      </Link>
    );
  } else {
    return (
      <button
        disabled={props.loading}
        onClick={props.onClick}
        className={classNames("w-full")}
      >
        <ButtonView {...props} />
      </button>
    );
  }
};
