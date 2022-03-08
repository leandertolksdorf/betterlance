import { PlusIcon, XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpsertCustomerFormProps, FormData } from ".";
import { Button } from "../Button";
import { DimExcept } from "../DimExcept";

type UpsertCustomerFormViewProps = UpsertCustomerFormProps & {
  isOpen: boolean;
  onOpen: () => void;
  loading: boolean;
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
                Firma
                <input {...props.register("company")} />
              </label>
              <label>
                Name
                <input {...props.register("name", { required: true })} />
              </label>
              <label>
                Email
                <input {...props.register("email", {})} />
              </label>
              <label>
                Straße & Hausnummer
                <input {...props.register("address")} />
              </label>
              <div className={classNames("grid", "grid-cols-2", "gap-4")}>
                <label className={classNames("col-span-1")}>
                  Postleitzahl
                  <input {...props.register("zip")} />
                </label>
                <label className={classNames("col-span-1")}>
                  Stadt
                  <input {...props.register("city")} />
                </label>
              </div>
              <label>
                Land
                <input {...props.register("country")} />
              </label>
              <Button type="submit" center>
                Absenden
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DimExcept>
  );
};
