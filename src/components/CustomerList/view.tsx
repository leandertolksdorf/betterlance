import classNames from "classnames";
import { definitions } from "../../types/supabase";
import { CustomerListItem } from "../CustomerListItem";
import { Loading } from "../Loading";

type CustomerListViewProps = {
  loading: boolean;
  customers: definitions["customer"][];
};

export const CustomerListView = (props: CustomerListViewProps) => {
  return props.loading ? (
    <Loading />
  ) : (
    <div className={classNames("my-2")}>
      {props.customers.map((customer) => (
        <CustomerListItem {...customer} />
      ))}
    </div>
  );
};
