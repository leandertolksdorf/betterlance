import { BriefcaseIcon } from "@heroicons/react/solid";
import React from "react";
import { Project } from "../../types/composite";
import { CustomerInfo } from "../CustomerInfo";
import { KanbanBoard } from "../KanbanBoard";
import { Layout } from "../Layout";
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
