import { OfficeBuildingIcon } from "@heroicons/react/outline";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import React, { Fragment } from "react";
import { ProjectWithCustomer, TaskWithProject } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { Box } from "../Box";
import { IconButton } from "../IconButton";
import { KanbanBoard } from "../KanbanBoard";
import { Layout } from "../Layout";
import { Loading } from "../Loading";
import { Section } from "../Section";
import { UpsertTaskForm } from "../UpsertTaskForm";

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
