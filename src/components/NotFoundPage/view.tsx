import classNames from "classnames";
import { NotFoundPageProps } from ".";
import { Layout } from "../Layout";

export const NotFoundPageView = (props: NotFoundPageProps) => {
  return (
    <Layout showNavigation={true} title="Nicht gefunden">
      <h2 className={classNames("font-bold")}>Oh je!</h2>
      <h2>
        {props.resourceNaming || "Diese Ressource"} konnten wir nicht finden!
      </h2>
    </Layout>
  );
};
