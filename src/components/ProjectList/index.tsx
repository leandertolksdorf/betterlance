import { useProjects } from "../../data/useProjects";
import { Error } from "../Error";
import { Loading } from "../Loading";
import { ProjectListView } from "./view";

export const ProjectList = () => {
  const { data: projects, error } = useProjects();

  if (error) return <Error message={error.message} />;
  if (!projects) return <Loading />;
  return <ProjectListView projects={projects} />;
};
