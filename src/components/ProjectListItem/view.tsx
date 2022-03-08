import { ArrowRightIcon, TrashIcon } from "@heroicons/react/outline";
import { BriefcaseIcon, UserIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import { ProjectListItemProps } from ".";
import { DimExcept } from "../DimExcept";

type ProjectListItemViewProps = ProjectListItemProps & {
  deleteRequested: boolean;
  onDeleteRequest: (shouldBeDeleted: boolean) => void;
  onDeleteConfirm: () => void;
};

export const ProjectListItemView = (props: ProjectListItemViewProps) => {
  return (
    <DimExcept dim={props.deleteRequested}>
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
          <div
            className={classNames("text-primary-500", "flex", "items-center")}
          >
            <UserIcon className={classNames("inline-icon", "mr-2")} />
            {props.customer?.name || "kein Kunde verknüpft"}
          </div>
        </div>
        <div className={classNames("flex")}>
          <button
            className={classNames(
              "flex",
              "icon",
              props.deleteRequested &&
                classNames(
                  "bg-red-300",
                  "text-red-800",
                  "hover:bg-red-400",
                  "hover:text-red-900"
                )
            )}
            onClick={() =>
              props.deleteRequested
                ? props.onDeleteConfirm()
                : props.onDeleteRequest(true)
            }
            onBlur={() => props.onDeleteRequest(false)}
          >
            <div
              className={classNames(
                props.deleteRequested ? "max-w-xs" : "max-w-0",
                "ease-in-out",
                "duration-300",
                "w-auto",
                "transition-all",
                "truncate",
                "overflow-hidden"
              )}
            >
              Projekt löschen?
            </div>
            <TrashIcon />
          </button>
          <Link href={"/app/projects/" + props.id}>
            <button className={classNames("icon", "ml-2")}>
              <ArrowRightIcon />
            </button>
          </Link>
        </div>
      </div>
    </DimExcept>
  );
};
