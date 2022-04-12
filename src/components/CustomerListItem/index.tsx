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
    try {
      await remove(props.id);
      toast.success("Kund:in gelöscht");
    } catch (error: any) {
      toast.error("Fehler beim Löschen");
    }
  };
  return <CustomerListItemView {...props} onDelete={onDelete} />;
};
