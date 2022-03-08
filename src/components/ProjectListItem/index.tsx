import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { ProjectWithCustomer } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { ProjectListItemView } from "./view";

export type ProjectListItemProps = ProjectWithCustomer;

export const ProjectListItem = (props: ProjectListItemProps) => {
  const [loading, setLoading] = useState(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<definitions["project"]>("project")
        .delete()
        .match({ id: props.id });

      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return <ProjectListItemView onDelete={onDelete} {...props} />;
};
