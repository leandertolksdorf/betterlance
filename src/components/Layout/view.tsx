import {
  BriefcaseIcon,
  CashIcon,
  CollectionIcon,
  LogoutIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import {
  ArrowCircleRightIcon,
  ArrowNarrowRightIcon,
  ArrowRightIcon,
  ArrowSmRightIcon,
} from "@heroicons/react/solid";
import { triggerAsyncId } from "async_hooks";
import classNames from "classnames";
import { useRouter } from "next/router";
import React from "react";
import { useTransition, animated, config } from "react-spring";
import { LayoutProps } from ".";
import { NavigationItem } from "../NavigationItem";

export type LayoutViewProps = LayoutProps & {
  onSignOut: () => void;
};

export const LayoutView = (props: LayoutViewProps) => {
  const router = useRouter();
  const transitions = useTransition(router.route, {
    from: { opacity: 0, x: -10 },
    enter: { opacity: 1, x: 0 },
  });
  return (
    <div className={classNames()}>
      <header className={classNames("py-8", "bg-primary-500", "shadow-xl")}>
        <div className={classNames("container", "mx-auto")}>
          <h1 className={classNames("text-white")}>Betterlance</h1>
          <h2 className={classNames("text-white", "flex", "items-center")}>
            <ArrowNarrowRightIcon
              className={classNames("inline-icon", "mr-2")}
            />
            <div>
              Das <b>bessere</b> Tool für Freelancer
            </div>
          </h2>
        </div>
      </header>
      <div
        className={classNames(
          "container",
          "mx-auto",
          "grid",
          "grid-cols-8",
          "gap-8",
          "my-8"
        )}
      >
        {props.showNavigation && (
          <nav className={classNames("col-span-2")}>
            <div className={classNames("sticky", "top-8")}>
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
            </div>
          </nav>
        )}
        {transitions((styles) => (
          <animated.main
            style={styles}
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
          </animated.main>
        ))}
      </div>
    </div>
  );
};
