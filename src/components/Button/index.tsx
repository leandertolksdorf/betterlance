import assert from "assert";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { ButtonView } from "./view";

export type ButtonProps = {
  className?: string;
  href?: string;
  onClick?: MouseEventHandler;
  icon?: ReactNode;
  light?: boolean;
  center?: boolean;
  children: ReactNode;
};

export const Button = (props: ButtonProps) => {
  assert(
    !(props.href && props.onClick),
    "Button cannot have the 'href' and the 'onClick' prop set."
  );

  if (props.href) {
    return (
      <Link href={props.href}>
        <ButtonView
          className={props.className}
          light={props.light}
          icon={props.icon}
        >
          {props.children}
        </ButtonView>
      </Link>
    );
  } else {
    return (
      <div onClick={props.onClick}>
        <ButtonView
          className={props.className}
          light={props.light}
          icon={props.icon}
        >
          {props.children}
        </ButtonView>
      </div>
    );
  }
};
