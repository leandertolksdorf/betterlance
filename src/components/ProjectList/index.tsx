import { useProjects } from "../../data/useProjects";
import { Error } from "../Error";
import { Loading } from "../Loading";
import { ProjectListView } from "./view";

type ProjectListProps = {
  customerId?: string;
};

export const ProjectList = (props: ProjectListProps) => {
  const { data, error } = useProjects();

  const projects = props.customerId
    ? data?.filter((project) => project.customer.id === props.customerId)
    : data;

  if (error) return <Error message={error.message} />;
  if (!projects) return <Loading />;
  return <ProjectListView projects={projects} />;
};
