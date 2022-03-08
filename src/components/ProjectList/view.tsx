import classNames from "classnames";
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
