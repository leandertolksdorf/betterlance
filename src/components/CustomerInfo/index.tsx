import { OfficeBuildingIcon } from "@heroicons/react/outline";
import { MailIcon, UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { definitions } from "../../types/supabase";
import { Box } from "../Box";

type CustomerInfoProps = {
  customer: definitions["customer"];
};

export const CustomerInfo = (props: CustomerInfoProps) => {
  return (
    <Box>
      <div
        className={classNames(
          "font-bold",
          "flex",
          "items-center",
          "text-primary-500"
        )}
      >
        <UserIcon className={classNames("inline-icon", "mr-2")} />
        {props.customer.name}
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
        {props.customer.email || "Email-Adresse fehlt"}
      </div>
      <div className={classNames("flex", "items-center")}>
        <OfficeBuildingIcon className={classNames("inline-icon", "mr-2")} />
        <div>
          {props.customer.company || "Firma fehlt"}
          <div className={classNames("text-gray-500")}>
            {props.customer.address || "Adresse fehlt"}
          </div>
          <div className={classNames("text-gray-500")}>
            {props.customer.zip || "PLZ fehlt"} &#183;{" "}
            {props.customer.city || "Stadt fehlt"}
          </div>
          <div className={classNames("text-gray-500")}>
            {props.customer.country || "Land fehlt"}
          </div>
        </div>
      </div>
    </Box>
  );
};
