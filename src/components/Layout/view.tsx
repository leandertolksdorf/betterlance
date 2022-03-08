import {
  BriefcaseIcon,
  CashIcon,
  CollectionIcon,
  LogoutIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import React from "react";
import { LayoutProps } from ".";
import { Navigation } from "../Navigation";
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
          </nav>
        )}
        <main
          className={classNames(
            !props.showNavigation ? "col-span-8" : "col-span-6"
          )}
        >
          <div className={classNames("mb-4", "border-b", "pb-4")}>
            {props.pageType && (
              <div
                className={classNames(
                  "bg-gray-100",
                  "inline-flex",
                  "items-center",
                  "py-1",
                  "px-2",
                  "mb-2",
                  "rounded",
                  "text-primary-900",
                  "font-bold",
                  "uppercase"
                )}
              >
                {props.pageTypeIcon && (
                  <div className={classNames("w-[1em]", "h-[1em]", "mr-1")}>
                    {props.pageTypeIcon}
                  </div>
                )}
                {props.pageType}
              </div>
            )}
            <h1 className={classNames("text-4xl")}>{props.title}</h1>
            {props.subtitle && (
              <h2
                className={classNames(
                  "text-2xl",
                  "text-primary-800",
                  "font-bold"
                )}
              >
                {props.subtitle}
              </h2>
            )}
          </div>
          {props.children}
        </main>
      </div>
    </div>
  );
};
