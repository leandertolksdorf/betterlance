import { ClipboardListIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import { TaskWithProject } from "../../types/composite";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Section } from "../Section";

type TaskDetailPageViewProps = {
  task?: TaskWithProject;
};

const stateTexts = {
  todo: "Offen",
  in_progress: "In Arbeit",
  done: "Erledigt",
  archived: "Archiviert",
};

export const TaskDetailPageView = (props: TaskDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      pageType="Aufgabe"
      pageTypeIcon={<ClipboardListIcon />}
      title={props.task ? props.task.title : ""}
      subtitle={props.task?.project ? props.task.project.name : ""}
    >
      <Section title="Aufgabe" text="Basisinformationen">
        <Box wrapsChild title="Status">
          {props.task && stateTexts[props.task.state]}
        </Box>
        {props.task?.project && (
          <Box wrapsChild title="Auftrag">
            <Link passHref href={"/app/projects/" + props.task.project.id}>
              <a>{props.task.project.name}</a>
            </Link>
          </Box>
        )}
      </Section>
      <Section title="Beschreibung" text="Worum geht es in dieser Aufgabe?">
        {props.task?.description?.split("\n").map((line, i) => (
          <Fragment key={i}>
            {line} <br />
          </Fragment>
        ))}
      </Section>
    </Layout>
  );
};
