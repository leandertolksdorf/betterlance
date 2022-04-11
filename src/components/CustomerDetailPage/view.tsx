import { OfficeBuildingIcon } from "@heroicons/react/outline";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";
import { Project } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { Box } from "../Box";
import { IconButton } from "../IconButton";
import { Layout } from "../Layout";
import { Loading } from "../Loading";
import { Section } from "../Section";
import { ProjectList } from "../ProjectList";
import { UpsertCustomerForm } from "../UpsertCustomerForm";
import { CustomerInfo } from "../CustomerInfo";

type CustomerDetailPageViewProps = {
  customer: definitions["customer"];
};

export const CustomerDetailPageView = (props: CustomerDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      pageType="Kund:in"
      pageTypeIcon={<UserIcon />}
      title={props.customer.name}
      subtitle={props.customer.company}
    >
      <Section
        title="Kundendaten"
        text="Hier kannst du die Stammdaten deiner Kunden bearbeiten."
      >
        <CustomerInfo customer={props.customer} />
        <UpsertCustomerForm customerId={props.customer.id} />
      </Section>
      <Section
        title="Aufträge"
        text="Verwalte hier alle mit diesem Kunden verknüpten Aufträge."
      >
        <ProjectList customerId={props.customer.id} />
      </Section>
    </Layout>
  );
};
