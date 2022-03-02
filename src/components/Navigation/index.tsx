import React, { ReactElement } from "react";
import { NavigationItemProps } from "../NavigationItem";
import { NavigationView } from "./view";

export type NavigationProps = {
  children?: ReactElement<NavigationItemProps>[];
};

export const Navigation = (props: NavigationProps) => {
  return <NavigationView {...props} />;
};
