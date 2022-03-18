import { ExclamationIcon } from "@heroicons/react/outline";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, UpsertProjectFormProps } from ".";
import { definitions } from "../../types/supabase";
import { Button } from "../Button";
import { Collapse } from "../Collapse";
import { DimExcept } from "../DimExcept";

type UpsertProjectFormViewProps = UpsertProjectFormProps & {
  loading: boolean;
  error: boolean;
  message?: string;
  customers: definitions["customer"][] | null;
  isOpen: boolean;
  onOpen: () => void;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const UpsertProjectFormView = (props: UpsertProjectFormViewProps) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    setInnerHeight(innerRef.current?.scrollHeight || 0);
  });

  return (
    <Collapse dim openText="Auftrag anlegen" closeText="Schließen">
      <div className={classNames("p-4")}>
        <h3 className={classNames("mb-2")}>
          {props.project ? "Auftrag bearbeiten" : "Auftrag anlegen"}
        </h3>
        <form onSubmit={props.onSubmit}>
          <label>
            Name{" "}
            <ErrorMessage
              errors={props.errors}
              name="name"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <input {...props.register("name")} />
          </label>
          <label>
            Kunde{" "}
            <ErrorMessage
              errors={props.errors}
              name="customer"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <select {...props.register("customer", { required: false })}>
              <option value={""}>keinen Kunden verknüpfen</option>
              {props.customers?.map((customer, index) => (
                <option key={index} value={customer.id}>
                  {[customer.name, customer.company]
                    .filter((value) => value !== "")
                    .join(" · ")}
                </option>
              ))}
            </select>
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
    </Collapse>
  );
};
