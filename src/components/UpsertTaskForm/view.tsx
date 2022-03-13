import { ExclamationIcon } from "@heroicons/react/outline";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, UpsertTaskFormProps } from ".";
import { definitions } from "../../types/supabase";
import { Button } from "../Button";
import { DimExcept } from "../DimExcept";

type UpsertTaskFormViewProps = UpsertTaskFormProps & {
  loading: boolean;
  error: boolean;
  message?: string;
  isOpen: boolean;
  onOpen: () => void;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const UpsertTaskFormView = (props: UpsertTaskFormViewProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    setInnerHeight(innerRef.current?.scrollHeight || 0);
  });

  return (
    <DimExcept dim={props.isOpen}>
      <div className={classNames("bg-gray-100", "rounded-lg", "my-2")}>
        <Button
          light={props.isOpen}
          onClick={props.onOpen}
          icon={props.isOpen ? <XIcon /> : <PlusIcon />}
        >
          {props.isOpen
            ? "Schließen"
            : props.task
            ? "Aufgabe bearbeiten"
            : "Aufgabe anlegen"}
        </Button>
        <div
          ref={innerRef}
          className={classNames("overflow-hidden", "transition-[max-height]")}
          style={{ maxHeight: props.isOpen ? innerHeight : 0 }}
        >
          <div className={classNames("p-4")}>
            <h3 className={classNames("mb-2")}>
              {props.task ? "Aufgabe bearbeiten" : "Aufgabe anlegen"}
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
              <Button type="submit" center loading={props.loading}>
                Absenden
              </Button>
              {props.message && (
                <div
                  className={classNames(
                    props.error ? "text-red-600" : "text-primary-500",
                    "mt-2",
                    "font-bold"
                  )}
                >
                  {props.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DimExcept>
  );
};
