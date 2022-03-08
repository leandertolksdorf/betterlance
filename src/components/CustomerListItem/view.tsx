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
import { IconButton } from "../IconButton";

type CustomerListItemViewProps = CustomerListItemProps & {
  onDelete: () => void;
};

export const CustomerListItemView = (props: CustomerListItemViewProps) => {
  return (
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
            <OfficeBuildingIcon className={classNames("inline-icon", "mr-2")} />
            <div>
              {props.company || "Firma fehlt"}
              <div className={classNames("text-gray-500")}>
                {props.address || "Adresse fehlt"}
              </div>
              <div className={classNames("text-gray-500")}>
                {props.zip || "PLZ fehlt"} &#183; {props.city || "Stadt fehlt"}
              </div>
              <div className={classNames("text-gray-500")}>
                {props.country || "Land fehlt"}
              </div>
            </div>
          </div>
        }
      </div>
      <div className={classNames("flex")}>
        <IconButton
          icon={<TrashIcon />}
          text={"Kund:in löschen?"}
          color="red"
          onClick={props.onDelete}
        />
        <IconButton
          className={classNames("ml-2")}
          href={"/app/customers/" + props.id}
          text="Zum Kunden"
          alwaysShowText
          icon={<ArrowRightIcon />}
        />
      </div>
    </div>
  );
};
