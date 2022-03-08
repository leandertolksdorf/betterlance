import classNames from "classnames";
import { definitions } from "../../types/supabase";
import { Loading } from "../Loading";
import { ProjectListItem, ProjectListItemResource } from "../ProjectListItem";

type ProjectListViewProps = {
  projects: ProjectListItemResource[];
};

export const ProjectListView = (props: ProjectListViewProps) => {
  return (
    <div className={classNames("my-2")}>
      {props.projects.map((project) => (
        <ProjectListItem {...project} />
      ))}
    </div>
  );
};
