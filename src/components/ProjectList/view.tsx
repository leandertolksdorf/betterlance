import classNames from "classnames";
import { useRef } from "react";
import { useTransition, animated } from "react-spring";
import { ProjectWithCustomer } from "../../types/composite";
import { ProjectListItem } from "../ProjectListItem";

type ProjectListViewProps = {
  projects: ProjectWithCustomer[];
};

export const ProjectListView = (props: ProjectListViewProps) => {
  const refs = useRef<(HTMLDivElement | null)[]>(
    Array(props.projects.length).fill(null)
  );

  const transitions = useTransition(props.projects, {
    initial: { x: 0, opacity: 0 },
    from: { x: -20, height: 0, opacity: 0 },
    enter: (item, i) => async (next, cancel) => {
      await next({
        x: 0,
        height: refs.current[i]?.scrollHeight,
        opacity: 1,
      });
      await next({ height: "unset" });
    },
    leave: { opacity: 0, height: 0 },
    keys: (item) => item.id,
  });

  return (
    <div className={classNames("my-2")}>
      {transitions((styles, item, t, i) => (
        <animated.div
          style={{ ...styles, overflow: "hidden" }}
          ref={(el) => (refs.current[i] = el)}
        >
          <ProjectListItem {...item} />
        </animated.div>
      ))}
    </div>
  );
};
