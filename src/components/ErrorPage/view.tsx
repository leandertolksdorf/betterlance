import { ArrowLeftIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ErrorPageProps } from ".";
import { Button } from "../Button";
import { Layout } from "../Layout";

export const ErrorPageView = (props: ErrorPageProps) => {
  const router = useRouter();
  return (
    <Layout
      showNavigation={true}
      title="Oh je!"
      subtitle="Es gab einen Fehler!"
    >
      <p className={classNames("mb-2")}>
        Möglicherweise existiert diese Ressource nicht.
      </p>
      <Button
        light
        className={classNames("mb-2")}
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className={classNames("inline-icon", "mr-2")} />
        Zurück gehen
      </Button>
      {props.message && (
        <p className={classNames("text-gray-300", "font-mono", "text-sm")}>
          Fehlermeldung: {props.message}
        </p>
      )}
    </Layout>
  );
};
