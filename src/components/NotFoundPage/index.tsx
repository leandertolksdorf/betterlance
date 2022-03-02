import { NotFoundPageView } from "./view";

export type NotFoundPageProps = {
  resourceNaming?: string;
};

export const NotFoundPage = (props: NotFoundPageProps) => {
  return <NotFoundPageView {...props} />;
};
