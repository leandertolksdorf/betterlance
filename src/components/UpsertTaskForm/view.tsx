import { ExclamationIcon } from "@heroicons/react/outline";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, UpsertTaskFormProps } from ".";
import { Button } from "../Button";
import { Collapse } from "../Collapse";

type UpsertTaskFormViewProps = UpsertTaskFormProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const UpsertTaskFormView = (props: UpsertTaskFormViewProps) => {
  return (
    <Collapse
      open={props.open}
      onPressButton={() => props.setOpen(!props.open)}
      dim
      openText={props.taskId ? "Aufgabe bearbeiten" : "Aufgabe anlegen"}
      closeText="Schließen"
    >
      <div className={classNames("p-4")}>
        <h3 className={classNames("mb-2")}>
          {props.taskId ? "Aufgabe bearbeiten" : "Aufgabe anlegen"}
        </h3>
        <form onSubmit={props.onSubmit}>
          <label>
            Titel{" "}
            <ErrorMessage
              errors={props.errors}
              name="title"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <input {...props.register("title")} />
          </label>
          <label>
            Beschreibung{" "}
            <ErrorMessage
              errors={props.errors}
              name="description"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <textarea rows={4} {...props.register("description")} />
          </label>
          <Button type="submit" center>
            Absenden
          </Button>
        </form>
      </div>
    </Collapse>
  );
};
