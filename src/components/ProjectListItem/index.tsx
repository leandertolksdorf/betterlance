import { useState } from "react";
import { useProjects } from "../../data/useProjects";
import { supabase } from "../../lib/supabase";
import { ProjectWithCustomer } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { ProjectListItemView } from "./view";

export type ProjectListItemProps = ProjectWithCustomer;

export const ProjectListItem = (props: ProjectListItemProps) => {
  const { remove } = useProjects();
  const onDelete = async () => {
    try {
      remove(props.id);
    } catch (e) {
      // TODO: add toast
    }
  };
  return <ProjectListItemView onDelete={onDelete} {...props} />;
};
