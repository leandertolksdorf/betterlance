import React from "react";
import { UpsertCustomerForm } from "../UpsertCustomerForm";
import { CustomerList } from "../CustomerList";
import { Layout } from "../Layout";

export const CustomerListPageView = () => {
  return (
    <Layout
      showNavigation={true}
      title="Kund*innen"
      subtitle="Hier kannst du alle deine Kund*innen verwalten"
    >
      <UpsertCustomerForm />
      <CustomerList />
    </Layout>
  );
};
