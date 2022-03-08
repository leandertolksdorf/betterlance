import { OfficeBuildingIcon } from "@heroicons/react/outline";
import { ArrowRightIcon, MailIcon, UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { ProjectWithCustomer } from "../../types/composite";
import { Box } from "../Box";
import { Layout } from "../Layout";
import { Loading } from "../Loading";
import { Section } from "../Section";

type ProjectDetailPageViewProps = {
  loading: boolean;
  project?: ProjectWithCustomer;
};

export const ProjectDetailPageView = (props: ProjectDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      title={props.project ? props.project.name : ""}
      subtitle={props.project?.customer ? props.project.customer.name : ""}
    >
      <Section title="Kunde" text="Du kannst Aufträge mit Kunden verknüpfen.">
        {props.loading || props.project === undefined ? (
          <Loading />
        ) : props.project.customer === undefined ? (
          "Dieser Auftrag ist mit keinem Kunden verknüpft"
        ) : (
          <Box>
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

            {
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
            }
          </Box>
        )}
      </Section>
    </Layout>
  );
};