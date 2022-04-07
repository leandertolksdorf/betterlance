import { definitions } from "./supabase";

export type ProjectWithCustomer = Omit<definitions["project"], "customer"> & {
  customer?: definitions["customer"];
};

export type TaskWithProject = Omit<definitions["task"], "project"> & {
  project?: definitions["project"];
};
export type Project = Omit<definitions["project"], "customer"> & {
  customer: definitions["customer"];
};

export type Task = Omit<definitions["task"], "project"> & {
  project: definitions["project"];
};
