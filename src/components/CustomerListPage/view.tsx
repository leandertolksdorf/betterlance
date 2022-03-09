import React from "react";
import { CustomerList } from "../CustomerList";
import { Layout } from "../Layout";
import { UpsertCustomerForm } from "../UpsertCustomerForm";

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
