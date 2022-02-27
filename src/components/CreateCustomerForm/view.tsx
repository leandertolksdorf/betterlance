import classNames from "classnames";
import React from "react";

type CreateCustomerFormViewProps = {
  isOpen: boolean;
  onOpen: () => void;
  loading: boolean;
  company: string;
  setCompany: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  zip: string;
  setZip: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  onSubmit: () => void;
};

export const CreateCustomerFormView = (props: CreateCustomerFormViewProps) => {
  return (
    <div className={classNames("bg-gray-100", "rounded", "my-2")}>
      <button className={classNames()} onClick={props.onOpen}>
        {props.isOpen ? "Schließen" : "Kund*in anlegen"}
      </button>
      <div className={classNames(!props.isOpen && "hidden")}>
        <div className={classNames("p-4")}>
          <form>
            <label>
              Firma
              <input
                type="text"
                value={props.company}
                onChange={(e) => props.setCompany(e.target.value)}
              ></input>
            </label>
            <label>
              Name
              <input
                type="text"
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
              ></input>
            </label>
            <label>
              Email
              <input
                type="email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
              ></input>
            </label>
            <label>
              Straße und Hausnummer
              <input
                type="text"
                value={props.address}
                onChange={(e) => props.setAddress(e.target.value)}
              ></input>
            </label>
            <label>
              Postleitzahl
              <input
                type="text"
                value={props.zip}
                onChange={(e) => props.setZip(e.target.value)}
              ></input>
            </label>
            <label>
              Stadt
              <input
                type="text"
                value={props.city}
                onChange={(e) => props.setCity(e.target.value)}
              ></input>
            </label>
            <label>
              Land
              <input
                type="text"
                value={props.country}
                onChange={(e) => props.setCountry(e.target.value)}
              ></input>
            </label>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.onSubmit();
              }}
            >
              Absenden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
