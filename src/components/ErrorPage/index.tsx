import { ErrorPageView } from "./view";

export type ErrorPageProps = {
  message?: string;
};

export const ErrorPage = (props: ErrorPageProps) => {
  return <ErrorPageView {...props} />;
};
