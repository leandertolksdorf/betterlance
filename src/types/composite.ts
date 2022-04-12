import { definitions } from "./supabase";
export type Project = Omit<definitions["project"], "customer"> & {
  customer: definitions["customer"];
};

export type Task = Omit<definitions["task"], "project"> & {
  project: definitions["project"];
};
