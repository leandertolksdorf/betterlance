import classNames from "classnames";
import React, { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from ".";

type CreateCustomerFormViewProps = {
  isOpen: boolean;
  onOpen: () => void;
  loading: boolean;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const CreateCustomerFormView = (props: CreateCustomerFormViewProps) => {
  return (
    <div className={classNames("bg-gray-100", "rounded", "my-2")}>
      <button className={classNames()} onClick={props.onOpen}>
        {props.isOpen ? "Schließen" : "Kund*in anlegen"}
      </button>
      <div className={classNames(!props.isOpen && "hidden")}>
        <div className={classNames("p-4")}>
          <form onSubmit={props.onSubmit}>
            <label>
              Firma
              <input {...props.register("company")} />
            </label>
            <label>
              Name
              <input {...props.register("name")} />
            </label>
            <label>
              Email
              <input {...props.register("email", {})} />
            </label>
            <label>
              Straße & Hausnummer
              <input {...props.register("address")} />
            </label>
            <label>
              Postleitzahl
              <input {...props.register("zip")} />
            </label>
            <label>
              Stadt
              <input {...props.register("city")} />
            </label>
            <label>
              Land
              <input {...props.register("country")} />
            </label>
            <button type="submit">Absenden</button>
          </form>
        </div>
      </div>
    </div>
  );
};
