import classNames from "classnames";
import { definitions } from "../../types/supabase";
import { CustomerListItem } from "../CustomerListItem";

type CustomerListViewProps = {
  customers: definitions["customer"][];
};

export const CustomerListView = (props: CustomerListViewProps) => {
  return (
    <div className={classNames("my-2")}>
      {props.customers.map((customer, index) => (
        <CustomerListItem key={index} {...customer} />
      ))}
    </div>
  );
};
