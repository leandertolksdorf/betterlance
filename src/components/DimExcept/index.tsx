import { ReactNode } from "react";
import { DimExceptView } from "./view";

export type DimExceptProps = {
  dim: boolean;
  children: ReactNode;
};

export const DimExcept = (props: DimExceptProps) => {
  return <DimExceptView {...props} />;
};
