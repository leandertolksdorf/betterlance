import { PlusIcon, XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateOrEditProjectFormProps, FormData } from ".";
import { definitions } from "../../types/supabase";
import { Button } from "../Button";
import { DimExcept } from "../DimExcept";

type CreateOrEditProjectFormViewProps = CreateOrEditProjectFormProps & {
  customers: definitions["customer"][] | null;
  isOpen: boolean;
  onOpen: () => void;
  loading: boolean;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const CreateOrEditProjectFormView = (
  props: CreateOrEditProjectFormViewProps
) => {
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
            : props.project
            ? "Projekt bearbeiten"
            : "Projekt anlegen"}
        </Button>
        <div
          ref={innerRef}
          className={classNames("overflow-hidden", "transition-[max-height]")}
          style={{ maxHeight: props.isOpen ? innerHeight : 0 }}
        >
          <div className={classNames("p-4")}>
            <h3 className={classNames("mb-2")}>
              {props.project ? "Auftrag bearbeiten" : "Auftrag anlegen"}
            </h3>
            <form onSubmit={props.onSubmit}>
              <label>
                Name
                <input {...props.register("name")} />
              </label>
              <label>
                Kunde
                <select {...props.register("customer", { required: false })}>
                  <option value={""}>keinen Kunden verknüpfen</option>
                  {props.customers?.map((customer) => (
                    <option value={customer.id}>
                      {[customer.name, customer.company]
                        .filter((value) => value !== "")
                        .join(" · ")}
                    </option>
                  ))}
                </select>
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
