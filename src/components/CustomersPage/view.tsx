import classNames from "classnames";
import React from "react";
import { AuthForm } from "../AuthForm";
import { CreateCustomerForm } from "../CreateCustomerForm";
import { CustomerList } from "../CustomerList";
import { Layout } from "../Layout";

export const CustomersPageView = () => {
  return (
    <Layout showNavigation={true} title="Kund*innen">
      <p>Hier kannst du alle deine Kund*innen verwalten.</p>
      <CreateCustomerForm />
      <CustomerList />
    </Layout>
  );
};
