import { ReactNode } from "react";
import { BoxView } from "./view";

export type BoxProps = {
  children?: ReactNode;
};

export const Box = (props: BoxProps) => {
  return <BoxView {...props} />;
};
