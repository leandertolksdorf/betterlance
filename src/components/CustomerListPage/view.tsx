import React from "react";
import { CreateOrEditCustomerForm } from "../CreateOrEditCustomerForm";
import { CustomerList } from "../CustomerList";
import { Layout } from "../Layout";

export const CustomerListPageView = () => {
  return (
    <Layout showNavigation={true} title="Kund*innen">
      <p>Hier kannst du alle deine Kund*innen verwalten.</p>
      <CreateOrEditCustomerForm />
      <CustomerList />
    </Layout>
  );
};
