import classNames from "classnames";
import {
  MutableRefObject,
  ReactElement,
  Ref,
  RefObject,
  useRef,
  useState,
} from "react";
import { config, useTransition, animated } from "react-spring";
import { useMeasure } from "react-use";
import { definitions } from "../../types/supabase";
import { CustomerListItem } from "../CustomerListItem";

type CustomerListViewProps = {
  customers: definitions["customer"][];
};

export const CustomerListView = (props: CustomerListViewProps) => {
  const refs = useRef<(HTMLDivElement | null)[]>(
    Array(props.customers.length).fill(null)
  );

  const transitions = useTransition(props.customers, {
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
          <CustomerListItem {...item} />
        </animated.div>
      ))}
    </div>
  );
};
