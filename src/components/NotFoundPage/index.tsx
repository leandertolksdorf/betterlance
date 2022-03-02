import { NotFoundPageView } from "./view";

export type NotFoundPageProps = {
  resourceName?: string;
};

export const NotFoundPage = (props: NotFoundPageProps) => {
  return <NotFoundPageView {...props} />;
};
