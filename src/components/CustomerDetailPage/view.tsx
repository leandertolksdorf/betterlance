import { UserIcon } from "@heroicons/react/solid";
import React from "react";
import { definitions } from "../../types/supabase";
import { CustomerInfo } from "../CustomerInfo";
import { Layout } from "../Layout";
import { ProjectList } from "../ProjectList";
import { Section } from "../Section";
import { UpsertCustomerForm } from "../UpsertCustomerForm";

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
