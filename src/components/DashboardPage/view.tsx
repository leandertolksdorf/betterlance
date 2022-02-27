import classNames from "classnames";
import React from "react";
import { AuthForm } from "../AuthForm";
import { Layout } from "../Layout";

export const DashboardPageView = () => {
  return (
    <Layout showNavigation={true} title="Dashboard">
      <p>
        Willkommen in deinem Dashboard! Hier kannst du deine Kunden, Aufträge
        und Rechnungen verwalten.
      </p>
    </Layout>
  );
};
