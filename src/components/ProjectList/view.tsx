import classNames from "classnames";
import { ProjectWithCustomer } from "../../types/composite";
import { ProjectListItem } from "../ProjectListItem";

type ProjectListViewProps = {
  projects: ProjectWithCustomer[];
};

export const ProjectListView = (props: ProjectListViewProps) => {
  return (
    <div className={classNames("my-2")}>
      {props.projects.map((project, index) => (
        <ProjectListItem key={index} {...project} />
      ))}
    </div>
  );
};
