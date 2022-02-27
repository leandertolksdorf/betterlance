import classNames from "classnames";
import React from "react";
import { AuthForm } from "../AuthForm";
import { Layout } from "../Layout";

export const AuthPageView = () => {
  return (
    <Layout>
      <p className={classNames("mb-8")}>
        Betterlance ist das Freelancer-Werkzeug der Zukunft.
        <br />
        Mit Betterlance vereinst du Kunden, Aufträge, Aufgaben und Rechnungen in
        einer modernen Software.
      </p>
      <h3 className={classNames("mb-4")}>
        Melde dich gleich an, um loszulegen!
      </h3>
      <AuthForm />
    </Layout>
  );
};
