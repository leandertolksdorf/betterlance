import { ReactNode, useState } from "react";
import { CollapseView } from "./view";

export type CollapseProps = {
  children?: ReactNode;
  openText: string;
  closeText: string;
  dim?: boolean;
  open: boolean;
  onPressButton: () => void;
};

export const Collapse = (props: CollapseProps) => {
  return <CollapseView {...props} />;
};
