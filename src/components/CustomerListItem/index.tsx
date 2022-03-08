import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { CustomerListItemView } from "./view";

export type CustomerListItemProps = Omit<
  definitions["customer"],
  "created_at" | "created_by"
>;

export const CustomerListItem = (props: CustomerListItemProps) => {
  const [loading, setLoading] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<definitions["customer"]>("customer")
        .delete()
        .match({ id: props.id });
      console.log(props.id);
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return <CustomerListItemView {...props} onDelete={onDelete} />;
};
