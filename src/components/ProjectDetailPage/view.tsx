import { OfficeBuildingIcon } from "@heroicons/react/outline";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";
import { Project, ProjectWithCustomer } from "../../types/composite";
import { Box } from "../Box";
import { CustomerInfo } from "../CustomerInfo";
import { IconButton } from "../IconButton";
import { KanbanBoard } from "../KanbanBoard";
import { Layout } from "../Layout";
import { Loading } from "../Loading";
import { Section } from "../Section";
import { UpsertProjectForm } from "../UpsertProjectForm";
import { UpsertTaskForm } from "../UpsertTaskForm";

type ProjectDetailPageViewProps = {
  project: Project;
};

export const ProjectDetailPageView = (props: ProjectDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      pageType="Auftrag"
      pageTypeIcon={<BriefcaseIcon />}
      title={props.project.name}
      subtitle={props.project.customer.name}
    >
      <Section title="Kunde" text="Du kannst Aufträge mit Kunden verknüpfen.">
        {/* TODO: add withLink prop to CustomerInfo */}
        <CustomerInfo customer={props.project.customer} />
        <UpsertProjectForm projectId={props.project.id} />
      </Section>
      <Section
        title="Aufgaben"
        text="Verwalte hier die Aufgaben zum Projekt"
        wide
      >
        <UpsertTaskForm projectId={props.project.id} />
        <KanbanBoard projectId={props.project.id} />
      </Section>
    </Layout>
  );
};
