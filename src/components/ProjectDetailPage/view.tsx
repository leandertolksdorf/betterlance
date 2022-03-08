import { OfficeBuildingIcon } from "@heroicons/react/outline";
import { MailIcon, UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";
import { ProjectWithCustomer } from "../../types/composite";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Section } from "../Section";

type ProjectDetailPageViewProps = {
  loading: boolean;
  project?: ProjectWithCustomer | null;
};

export const ProjectDetailPageView = (props: ProjectDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      title={props.project ? props.project.name : ""}
      subtitle={props.project?.customer ? props.project.customer.name : ""}
    >
      <Section
        loading={props.loading}
        title="Kunde"
        text="Du kannst Aufträge mit Kunden verknüpfen."
      >
        <Box>
          {props.project?.customer ? (
            <>
              <div className={classNames("font-bold", "flex", "items-center")}>
                <UserIcon className={classNames("inline-icon", "mr-2")} />
                {props.project.customer.name}
              </div>
              <div
                className={classNames(
                  "font-bold",
                  "flex",
                  "items-center",
                  "mb-2"
                )}
              >
                <MailIcon className={classNames("inline-icon", "mr-2")} />
                {props.project.customer.email}
              </div>
              <div className={classNames("flex", "items-center")}>
                <OfficeBuildingIcon
                  className={classNames("inline-icon", "mr-2")}
                />
                <div>
                  {props.project.customer.company}
                  <div className={classNames("text-gray-500")}>
                    {props.project.customer.address}
                  </div>
                  <div className={classNames("text-gray-500")}>
                    {props.project.customer.zip} {props.project.customer.city}
                  </div>
                  <div className={classNames("text-gray-500")}>
                    {props.project.customer.country}
                  </div>
                </div>
              </div>
            </>
          ) : (
            "Der Auftrag ist mit keinem Kunden verknüpft."
          )}
        </Box>
      </Section>
    </Layout>
  );
};
