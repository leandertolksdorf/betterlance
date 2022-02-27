import classNames from "classnames";
import React, { ReactNode } from "react";
import { LayoutProps } from ".";
import { Navigation } from "../Navigation";
import {
  BeakerIcon,
  BriefcaseIcon,
  CashIcon,
  CollectionIcon,
  LogoutIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { NavigationItem } from "../NavigationItem";

export type LayoutViewProps = LayoutProps & {
  onSignOut: () => void;
};

export const LayoutView = (props: LayoutViewProps) => {
  return (
    <div className={classNames("container", "mx-auto")}>
      <header className={classNames("my-8")}>
        <h1>Betterlance</h1>
        <h2>
          das <b>bessere</b> freelancer tool
        </h2>
      </header>
      <div className={classNames("grid", "grid-cols-8", "gap-8", "my-8")}>
        {props.showNavigation && (
          <nav className={classNames("col-span-2")}>
            <Navigation>
              <NavigationItem
                title="Dashboard"
                href="/app"
                icon={<CollectionIcon />}
              />
              <NavigationItem
                title="Kunden"
                href="/app/customers"
                icon={<UsersIcon />}
              />
              <NavigationItem
                title="Aufträge"
                href="/app/projects"
                icon={<BriefcaseIcon />}
              />
              <NavigationItem
                title="Rechnungen"
                href="/app/invoices"
                icon={<CashIcon />}
              />
              <NavigationItem
                title="Abmelden"
                onClick={props.onSignOut}
                icon={<LogoutIcon />}
              />
            </Navigation>
          </nav>
        )}
        <main
          className={classNames(
            !props.showNavigation ? "col-span-8" : "col-span-6"
          )}
        >
          {props.title && <h1 className={classNames("mb-2")}>{props.title}</h1>}
          {props.children}
        </main>
      </div>
    </div>
  );
};
