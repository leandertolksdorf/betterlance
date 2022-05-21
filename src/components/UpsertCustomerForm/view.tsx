import { ExclamationIcon } from "@heroicons/react/outline";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import React, { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, UpsertCustomerFormProps } from ".";
import { Button } from "../Button";
import { Collapse } from "../Collapse";

type UpsertCustomerFormViewProps = UpsertCustomerFormProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const UpsertCustomerFormView = (props: UpsertCustomerFormViewProps) => {
  return (
    <Collapse
      open={props.open}
      onPressButton={() => props.setOpen(!props.open)}
      dim
      openText={props.customerId ? "Kund:in bearbeiten" : "Kund:in anlegen"}
      closeText="Schließen"
    >
      <div className={classNames("p-4")}>
        <h3 className={classNames("mb-2")}>
          {props.customerId ? "Kund:in bearbeiten" : "Kund:in anlegen"}
        </h3>
        <form onSubmit={props.onSubmit}>
          <label>
            Firma{" "}
            <ErrorMessage
              errors={props.errors}
              name="company"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <input {...props.register("company")} />
          </label>
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
            <input {...props.register("name", { required: true })} />
          </label>
          <label>
            Email{" "}
            <ErrorMessage
              errors={props.errors}
              name="email"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <input {...props.register("email", {})} />
          </label>
          <label>
            Straße & Hausnummer{" "}
            <ErrorMessage
              errors={props.errors}
              name="address"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <input {...props.register("address")} />
          </label>
          <div className={classNames("grid", "grid-cols-2", "gap-4")}>
            <label className={classNames("col-span-1")}>
              Postleitzahl{" "}
              <ErrorMessage
                errors={props.errors}
                name="zip"
                render={({ message }) => (
                  <span className={classNames("text-red-600", "ml-1")}>
                    <ExclamationIcon
                      className={classNames("inline-icon", "mr-1")}
                    />
                    {message}
                  </span>
                )}
              />
              <input {...props.register("zip")} />
            </label>
            <label className={classNames("col-span-1")}>
              Stadt{" "}
              <ErrorMessage
                errors={props.errors}
                name="city"
                render={({ message }) => (
                  <span className={classNames("text-red-600", "ml-1")}>
                    <ExclamationIcon
                      className={classNames("inline-icon", "mr-1")}
                    />
                    {message}
                  </span>
                )}
              />
              <input {...props.register("city")} />
            </label>
          </div>
          <label>
            Land{" "}
            <ErrorMessage
              errors={props.errors}
              name="country"
              render={({ message }) => (
                <span className={classNames("text-red-600", "ml-1")}>
                  <ExclamationIcon
                    className={classNames("inline-icon", "mr-1")}
                  />
                  {message}
                </span>
              )}
            />
            <input {...props.register("country")} />
          </label>
          <Button type="submit" center>
            Absenden
          </Button>
        </form>
      </div>
    </Collapse>
  );
};
