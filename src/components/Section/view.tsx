import classNames from "classnames";
import { SectionProps } from ".";
import { Loading } from "../Loading";
export const SectionView = (props: SectionProps) => {
  return (
    <div className={classNames("mb-4")}>
      {props.title && (
        <h2 className={classNames("font-bold", "mb-2")}>{props.title}</h2>
      )}
      <div className={classNames("bg-gray-100", "rounded", "p-4")}>
        {props.loading ? <Loading /> : props.children}
      </div>
    </div>
  );
};
