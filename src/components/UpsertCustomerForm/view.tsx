import { ExclamationIcon } from "@heroicons/react/outline";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, UpsertCustomerFormProps } from ".";
import { Button } from "../Button";
import { DimExcept } from "../DimExcept";

type UpsertCustomerFormViewProps = UpsertCustomerFormProps & {
  loading: boolean;
  error: boolean;
  message?: string;
  isOpen: boolean;
  onOpen: () => void;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const UpsertCustomerFormView = (props: UpsertCustomerFormViewProps) => {
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
            : props.customer
            ? "Kund*in bearbeiten"
            : "Kund*in anlegen"}
        </Button>
        <div
          ref={innerRef}
          className={classNames("overflow-hidden", "transition-[max-height]")}
          style={{
            maxHeight: props.isOpen ? innerHeight : 0,
          }}
        >
          <div className={classNames("p-4")}>
            <h3 className={classNames("mb-2")}>
              {props.customer ? "Kund*in bearbeiten" : "Kund*in anlegen"}
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
