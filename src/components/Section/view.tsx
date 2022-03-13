import classNames from "classnames";
import { SectionProps } from ".";
export const SectionView = (props: SectionProps) => {
  return (
    <div
      className={classNames(
        "mb-4",
        "grid",
        "grid-cols-3",
        props.wide ? "gap-2" : "gap-8"
      )}
    >
      <div className={classNames(props.wide ? "col-span-3" : "col-span-1")}>
        {props.title && (
          <h2 className={classNames("text-primary-500", "font-bold")}>
            {props.title}
          </h2>
        )}
        {props.text && (
          <p className={classNames("text-primary-900", "font-bold")}>
            {props.text}
          </p>
        )}
      </div>
      <div className={classNames(props.wide ? "col-span-3" : "col-span-2")}>
        {props.children}
      </div>
    </div>
  );
};
