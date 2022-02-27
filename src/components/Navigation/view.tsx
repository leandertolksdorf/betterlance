import classNames from "classnames";
import React, { ReactNode } from "react";
import { NavigationProps } from ".";

export const NavigationView = (props: NavigationProps) => {
  return <div className={classNames("")}>{props.children}</div>;
};
