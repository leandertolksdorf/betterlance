import { ArrowRightIcon, TrashIcon } from "@heroicons/react/outline";
import { BriefcaseIcon, UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import { ProjectListItemProps } from ".";
import { DimExcept } from "../DimExcept";
import { IconButton } from "../IconButton";

type ProjectListItemViewProps = ProjectListItemProps & {
  onDelete: () => void;
};

export const ProjectListItemView = (props: ProjectListItemViewProps) => {
  return (
    <div
      className={classNames(
        "bg-gray-100",
        "rounded",
        "mb-2",
        "p-4",
        "flex",
        "justify-between",
        "items-end"
      )}
    >
      <div>
        <div
          className={classNames(
            "font-bold",
            "text-primary-500",
            "flex",
            "items-center"
          )}
        >
          <BriefcaseIcon className={classNames("inline-icon", "mr-2")} />
          {props.name}
        </div>
        <div className={classNames("text-primary-500", "flex", "items-center")}>
          <UserIcon className={classNames("inline-icon", "mr-2")} />
          {props.customer?.name || "kein Kunde verknüpft"}
        </div>
      </div>
      <div className={classNames("flex")}>
        <IconButton
          icon={<TrashIcon />}
          text="Auftrag löschen?"
          onClick={props.onDelete}
          color="red"
        />
        <IconButton
          className={classNames("ml-2")}
          icon={<ArrowRightIcon />}
          text="Zum Auftrag"
          alwaysShowText
          href={"/app/projects/" + props.id}
        />
      </div>
    </div>
  );
};
