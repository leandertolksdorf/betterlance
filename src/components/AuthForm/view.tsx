import { CloudIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from ".";
import { Button } from "../Button";

type AuthFormViewProps = {
  loading: boolean;
  error: boolean;
  message?: string;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const AuthFormView = (props: AuthFormViewProps) => {
  return (
    <form onSubmit={props.onSubmit}>
      <label>
        Email
        <input {...props.register("email", { disabled: props.loading })} />
      </label>
      <Button icon={props.loading && <CloudIcon />} type="submit" center>
        Anmelden
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
  );
};
