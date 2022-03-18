import { ReactNode, useState } from "react";
import { CollapseView } from "./view";

export type CollapseProps = {
  children?: ReactNode;
  openText: string;
  closeText: string;
  dim?: boolean;
};

export const Collapse = (props: CollapseProps) => {
  const [open, setOpen] = useState(false);

  return <CollapseView open={open} setOpen={setOpen} {...props} />;
};
