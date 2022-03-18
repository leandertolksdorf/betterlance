import { OfficeBuildingIcon } from "@heroicons/react/outline";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";
import { ProjectWithCustomer } from "../../types/composite";
import { Box } from "../Box";
import { IconButton } from "../IconButton";
import { KanbanBoard } from "../KanbanBoard";
import { Layout } from "../Layout";
import { Loading } from "../Loading";
import { Section } from "../Section";
import { UpsertTaskForm } from "../UpsertTaskForm";

type ProjectDetailPageViewProps = {
  project?: ProjectWithCustomer;
};

export const ProjectDetailPageView = (props: ProjectDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      pageType="Auftrag"
      pageTypeIcon={<BriefcaseIcon />}
      title={props.project ? props.project.name : ""}
      subtitle={props.project?.customer ? props.project.customer.name : ""}
    >
      <Section title="Kunde" text="Du kannst Aufträge mit Kunden verknüpfen.">
        {props.project === undefined ? (
          <Loading />
        ) : props.project.customer === undefined ? (
          "Dieser Auftrag ist mit keinem Kunden verknüpft"
        ) : (
          <Box>
            <div className={classNames("flex", "justify-between")}>
              <div>
                <div
                  className={classNames(
                    "font-bold",
                    "flex",
                    "items-center",
                    "text-primary-500"
                  )}
                >
                  <UserIcon className={classNames("inline-icon", "mr-2")} />
                  {props.project.customer?.name}
                </div>
                <div
                  className={classNames(
                    "font-bold",
                    "flex",
                    "items-center",
                    "mb-2",
                    "text-primary-500"
                  )}
                >
                  <MailIcon className={classNames("inline-icon", "mr-2")} />
                  {props.project.customer.email || "Email-Adresse fehlt"}
                </div>
                <div className={classNames("flex", "items-center")}>
                  <OfficeBuildingIcon
                    className={classNames("inline-icon", "mr-2")}
                  />
                  <div>
                    {props.project.customer.company || "Firma fehlt"}
                    <div className={classNames("text-gray-500")}>
                      {props.project.customer.address || "Adresse fehlt"}
                    </div>
                    <div className={classNames("text-gray-500")}>
                      {props.project.customer.zip || "PLZ fehlt"} &#183;{" "}
                      {props.project.customer.city || "Stadt fehlt"}
                    </div>
                    <div className={classNames("text-gray-500")}>
                      {props.project.customer.country || "Land fehlt"}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classNames("flex", "items-end")}>
                <IconButton
                  text="Zum Kunden"
                  alwaysShowText
                  icon={<ArrowRightIcon />}
                  href={"/app/customers/" + props.project.customer.id}
                />
              </div>
            </div>
          </Box>
        )}
      </Section>
      <Section
        title="Aufgaben"
        text="Verwalte hier die Aufgaben zum Projekt"
        wide
      >
        {props.project === undefined ? (
          <Loading />
        ) : (
          <>
            <UpsertTaskForm projectId={props.project.id} />
            <KanbanBoard projectId={props.project.id} />
          </>
        )}
      </Section>
    </Layout>
  );
};
