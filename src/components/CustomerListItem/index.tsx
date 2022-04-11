import { useState } from "react";
import { useCustomers } from "../../data/useCustomers";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { CustomerListItemView } from "./view";

export type CustomerListItemProps = Omit<
  definitions["customer"],
  "created_at" | "created_by"
>;

export const CustomerListItem = (props: CustomerListItemProps) => {
  const { remove } = useCustomers();

  const onDelete = async () => {
    try {
      remove(props.id);
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };
  return <CustomerListItemView {...props} onDelete={onDelete} />;
};
