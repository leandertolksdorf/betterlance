import { ReactNode } from "react";
import { SectionView } from "./view";

export type SectionProps = {
  title?: string;
  text?: string;
  children?: ReactNode;
  wrapChild?: boolean;
};
export const Section = (props: SectionProps) => {
  return <SectionView {...props} />;
};
