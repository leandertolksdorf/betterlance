import classNames from "classnames";
import { definitions } from "../../types/supabase";
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
        <div className={classNames("bg-gray-100", "rounded", "mb-2", "p-4")}>
          <div className={classNames("font-bold", "text-primary-500")}>
            {customer.name}
          </div>
          <div className={classNames("text-primary-500")}>
            {customer.company}
          </div>
          <div className={classNames()}>{customer.email}</div>
          <div className={classNames("text-gray-500")}>
            {customer.address}
            <br />
            {customer.zip} {customer.city}
            <br />
            {customer.country}
          </div>
        </div>
      ))}
    </div>
  );
};
