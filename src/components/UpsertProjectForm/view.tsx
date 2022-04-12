import { ExclamationIcon } from "@heroicons/react/outline";
import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { FormEventHandler } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData, UpsertProjectFormProps } from ".";
import { definitions } from "../../types/supabase";
import { Button } from "../Button";
import { Collapse } from "../Collapse";
import { Select } from "../Select";

type UpsertProjectFormViewProps = UpsertProjectFormProps & {
  customers?: definitions["customer"][];
  open: boolean;
  setOpen: (open: boolean) => void;
  register: UseFormRegister<FormData>;
  control: Control<FormData, any>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const UpsertProjectFormView = (props: UpsertProjectFormViewProps) => {
  const customerOptions =
    props.customers?.map((customer) => ({
      label: [customer.name, customer.company].filter(Boolean).join(" · "),
      value: customer.id,
    })) || [];

  return (
    <Collapse
      open={props.open}
      onPressButton={() => props.setOpen(!props.open)}
      dim
      openText={props.projectId ? "Auftrag bearbeiten" : "Auftrag anlegen"}
      closeText="Schließen"
    >
      <div className={classNames("p-4")}>
        <h3 className={classNames("mb-2")}>
          {props.projectId ? "Auftrag bearbeiten" : "Auftrag anlegen"}
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
            <Select
              {...props.register("customer")}
              options={customerOptions}
              search
            />
          </label>
          <Button type="submit" center>
            Absenden
          </Button>
        </form>
      </div>
    </Collapse>
  );
};
