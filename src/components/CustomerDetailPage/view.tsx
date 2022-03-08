import { OfficeBuildingIcon } from "@heroicons/react/outline";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { definitions } from "../../types/supabase";
import { Box } from "../Box";
import { UpsertCustomerForm } from "../UpsertCustomerForm";
import { Layout } from "../Layout";
import { Loading } from "../Loading";
import { ProjectListItem } from "../ProjectListItem";
import { Section } from "../Section";
import { IconButton } from "../IconButton";

type CustomerDetailPageViewProps = {
  loading: boolean;
  customer?: definitions["customer"];
  projects?: definitions["project"][];
};

export const CustomerDetailPageView = (props: CustomerDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      pageType="Kund:in"
      pageTypeIcon={<UserIcon />}
      title={props.customer ? props.customer.name : ""}
      subtitle={props.customer ? props.customer.company : ""}
    >
      <Section
        title="Kundendaten"
        text="Hier kannst du die Stammdaten deiner Kunden bearbeiten."
      >
        {props.loading || props.customer === undefined ? (
          <Loading />
        ) : (
          <>
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
                {props.customer?.name}
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
                {props.customer?.email || "Email-Adresse fehlt"}
              </div>

              {
                <div className={classNames("flex", "items-center")}>
                  <OfficeBuildingIcon
                    className={classNames("inline-icon", "mr-2")}
                  />
                  <div>
                    {props.customer?.company || "Firma fehlt"}
                    <div className={classNames("text-gray-500")}>
                      {props.customer?.address || "Adresse fehlt"}
                    </div>
                    <div className={classNames("text-gray-500")}>
                      {props.customer?.zip || "PLZ fehlt"} &#183;{" "}
                      {props.customer?.city || "Stadt fehlt"}
                    </div>
                    <div className={classNames("text-gray-500")}>
                      {props.customer?.country || "Land fehlt"}
                    </div>
                  </div>
                </div>
              }
            </Box>
            <UpsertCustomerForm customer={props.customer} />
          </>
        )}
      </Section>
      <Section
        title="Aufträge"
        text="Verwalte hier alle mit diesem Kunden verknüpten Aufträge."
      >
        {props.loading || props.projects === undefined ? (
          <Loading />
        ) : props.projects.length === 0 ? (
          "Du hast noch keine Aufträge mit diesem Kunden verknüpft."
        ) : (
          props.projects.map((project) => (
            <Box>
              <div className={classNames("flex", "justify-between")}>
                <div
                  className={classNames(
                    "text-primary-500",
                    "font-bold",
                    "flex",
                    "items-center"
                  )}
                >
                  <BriefcaseIcon
                    className={classNames("inline-icon", "mr-2")}
                  />
                  {project.name}
                </div>
                <div className={classNames("flex", "justify-end")}>
                  <IconButton
                    icon={<ArrowRightIcon />}
                    text="Zum Auftrag"
                    alwaysShowText
                    href={"/app/projects/" + project.id}
                  />
                </div>
              </div>
            </Box>
          ))
        )}
      </Section>
    </Layout>
  );
};
