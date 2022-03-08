import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { ProjectListItemView } from "./view";

export type ProjectListItemResource = Omit<
  definitions["project"],
  "customer"
> & {
  customer?: definitions["customer"];
};

export type ProjectListItemProps = ProjectListItemResource;

export const ProjectListItem = (props: ProjectListItemProps) => {
  const [loading, setLoading] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const onDeleteConfirm = async () => {
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
  return (
    <ProjectListItemView
      deleteRequested={deleteRequested}
      onDeleteRequest={setDeleteRequested}
      onDeleteConfirm={onDeleteConfirm}
      {...props}
    />
  );
};
