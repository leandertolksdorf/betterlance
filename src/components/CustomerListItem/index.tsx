import { toast } from "react-toastify";
import { useCustomers } from "../../data/useCustomers";
import { definitions } from "../../types/supabase";
import { CustomerListItemView } from "./view";

export type CustomerListItemProps = Omit<
  definitions["customer"],
  "created_at" | "created_by"
>;

export const CustomerListItem = (props: CustomerListItemProps) => {
  const { remove } = useCustomers();

  const onDelete = async () => {
    toast.promise(remove(props.id), {
      pending: "Löschen...",
      success: "Kund:in gelöscht",
      error: "Fehler beim Löschen",
    });
  };
  return <CustomerListItemView {...props} onDelete={onDelete} />;
};
