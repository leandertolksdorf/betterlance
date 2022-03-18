import { definitions } from "./supabase";

export type ProjectWithCustomer = Omit<definitions["project"], "customer"> & {
  customer?: definitions["customer"];
};

export type TaskWithProject = Omit<definitions["task"], "project"> & {
  project?: definitions["project"];
};
