import classNames from "classnames";
import React from "react";
import { definitions } from "../../types/supabase";
import { AuthForm } from "../AuthForm";
import { CreateOrEditCustomerForm } from "../CreateOrEditCustomerForm";
import { CustomerList } from "../CustomerList";
import { Layout } from "../Layout";
import { Loading } from "../Loading";
import { Section } from "../Section";

type CustomerDetailPageViewProps = {
  loading: boolean;
  customer?: definitions["customer"] | null;
};

export const CustomerDetailPageView = (props: CustomerDetailPageViewProps) => {
  return (
    <Layout
      showNavigation={true}
      title={
        props.loading
          ? "Laden..."
          : props.customer
          ? props.customer.name
          : "Fehler"
      }
    >
      <>
        <Section loading={props.loading} title="Kontaktdaten">
          <div className={classNames("font-bold", "text-primary-500")}>
            {props.customer?.name}
          </div>
          <div className={classNames("text-primary-500")}>
            {props.customer?.company}
          </div>
          <div className={classNames()}>{props.customer?.email}</div>
          <div className={classNames("text-gray-500")}>
            {props.customer?.address}
          </div>
          <div className={classNames("text-gray-500")}>
            {props.customer?.zip} {props.customer?.city}
          </div>
          <div className={classNames("text-gray-500")}>
            {props.customer?.country}
          </div>
          <CreateOrEditCustomerForm customer={props.customer || undefined} />
        </Section>
        <Section loading={props.loading} title="Aufträge">
          Hello
        </Section>
      </>
    </Layout>
  );
};
