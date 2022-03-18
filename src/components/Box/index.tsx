import { ReactNode } from "react";
import { BoxView } from "./view";

export type BoxProps = {
  children?: ReactNode;
  title?: string;
  wrapsChild?: boolean;
};

export const Box = (props: BoxProps) => {
  return <BoxView {...props} />;
};
