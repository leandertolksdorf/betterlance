import {
  ArrowRightIcon,
  OfficeBuildingIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { MailIcon, UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import { CustomerListItemProps } from ".";
import { DimExcept } from "../DimExcept";

type CustomerListItemViewProps = CustomerListItemProps & {
  deleteRequested: boolean;
  onDeleteRequest: (shouldBeDeleted: boolean) => void;
  onDeleteConfirm: () => void;
};

export const CustomerListItemView = (props: CustomerListItemViewProps) => {
  return (
    <DimExcept dim={props.deleteRequested}>
      <div
        className={classNames(
          "bg-gray-100",
          "rounded",
          "mb-2",
          "p-4",
          "flex",
          "justify-between",
          "items-end"
        )}
      >
        <div>
          <div
            className={classNames(
              "font-bold",
              "flex",
              "items-center",
              "text-primary-500"
            )}
          >
            <UserIcon className={classNames("inline-icon", "mr-2")} />
            {props.name}
          </div>
          <div
            className={classNames(
              "font-bold",
              "flex",
              "items-center",
              "mb-2",
              "text-primary-500"
            )}
          >
            <MailIcon className={classNames("inline-icon", "mr-2")} />
            {props.email || "Email-Adresse fehlt"}
          </div>

          {
            <div className={classNames("flex", "items-center")}>
              <OfficeBuildingIcon
                className={classNames("inline-icon", "mr-2")}
              />
              <div>
                {props.company || "Firma fehlt"}
                <div className={classNames("text-gray-500")}>
                  {props.address || "Adresse fehlt"}
                </div>
                <div className={classNames("text-gray-500")}>
                  {props.zip || "PLZ fehlt"} &#183;{" "}
                  {props.city || "Stadt fehlt"}
                </div>
                <div className={classNames("text-gray-500")}>
                  {props.country || "Land fehlt"}
                </div>
              </div>
            </div>
          }
        </div>
        <div className={classNames("flex")}>
          <button
            className={classNames(
              "flex",
              "icon",
              props.deleteRequested &&
                classNames(
                  "bg-red-300",
                  "text-red-800",
                  "hover:bg-red-400",
                  "hover:text-red-900"
                )
            )}
            onClick={() =>
              props.deleteRequested
                ? props.onDeleteConfirm()
                : props.onDeleteRequest(true)
            }
            onBlur={() => props.onDeleteRequest(false)}
          >
            <div
              className={classNames(
                props.deleteRequested ? "max-w-xs" : "max-w-0",
                "ease-in-out",
                "duration-300",
                "w-auto",
                "transition-all",
                "truncate",
                "overflow-hidden"
              )}
            >
              Kund*in löschen?
            </div>
            <TrashIcon />
          </button>
          <Link href={"/app/customers/" + props.id}>
            <button className={classNames("icon", "ml-2")}>
              <ArrowRightIcon />
            </button>
          </Link>
        </div>
      </div>
    </DimExcept>
  );
};
