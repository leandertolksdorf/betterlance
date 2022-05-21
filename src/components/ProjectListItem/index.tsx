import { toast } from "react-toastify";
import { useProjects } from "../../data/useProjects";
import { Project } from "../../types/composite";
import { ProjectListItemView } from "./view";

export type ProjectListItemProps = Project;

export const ProjectListItem = (props: ProjectListItemProps) => {
  const { remove } = useProjects();
  const onDelete = async () => {
    toast.promise(remove(props.id), {
      pending: "Löschen...",
      success: "Auftrag gelöscht",
      error: "Fehler beim Löschen",
    });
  };
  return <ProjectListItemView onDelete={onDelete} {...props} />;
};
