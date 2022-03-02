import { ReactNode } from "react";
import { SectionView } from "./view";

export type SectionProps = {
  title?: string;
  children?: ReactNode;
  loading?: boolean;
};
export const Section = (props: SectionProps) => {
  return <SectionView {...props} />;
};
