import { definitions } from "./supabase";

export type ProjectWithCustomer = Omit<definitions["project"], "customer"> & {
  customer?: definitions["customer"];
};
