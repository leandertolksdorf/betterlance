import { OfficeBuildingIcon } from "@heroicons/react/outline";
import { MailIcon, UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";
import { definitions } from "../../types/supabase";
import { CreateOrEditCustomerForm } from "../CreateOrEditCustomerForm";
import { Layout } from "../Layout";
import { Section } from "../Section";

type CustomerDetailPageViewProps = {
  loading: boolean;
  customer?: definitions["customer"] | null;
};

export const CustomerDetailPageView = (props: CustomerDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      title={props.customer ? props.customer.name : ""}
      subtitle={props.customer ? props.customer.company : ""}
    >
      <div className={classNames("grid", "grid-cols-2", "gap-8")}>
        <div className={classNames("col-span-1")}>
          <Section loading={props.loading} title="Kundendaten">
            <div className={classNames("font-bold", "flex", "items-center")}>
              <UserIcon className={classNames("inline-icon", "mr-2")} />
              {props.customer?.name}
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
              {props.customer?.email}
            </div>
            <div className={classNames("flex", "items-center")}>
              <OfficeBuildingIcon
                className={classNames("inline-icon", "mr-2")}
              />
              <div>
                {props.customer?.company}
                <div className={classNames("text-gray-500")}>
                  {props.customer?.address}
                </div>
                <div className={classNames("text-gray-500")}>
                  {props.customer?.zip} {props.customer?.city}
                </div>
                <div className={classNames("text-gray-500")}>
                  {props.customer?.country}
                </div>
              </div>
            </div>
          </Section>
        </div>
        <div className={classNames("col-span-1")}>
          <Section wrapChild loading={props.loading} title="Bearbeiten">
            <CreateOrEditCustomerForm customer={props.customer || undefined} />
          </Section>
        </div>
        <div className={classNames("col-span-2")}>
          <Section loading={props.loading} title="Aufträge">
            Noch keine Aufträge
          </Section>
        </div>
      </div>
    </Layout>
  );
};
