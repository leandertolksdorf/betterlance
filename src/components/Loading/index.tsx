import React from "react";
import { LoadingView } from "./view";

export type LoadingProps = {
  className?: string;
};

export const Loading = (props: LoadingProps) => {
  return <LoadingView {...props} />;
};
