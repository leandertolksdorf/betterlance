import { ExclamationIcon } from "@heroicons/react/outline";
import { ErrorMessage } from "@hookform/error-message";
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
        Email{" "}
        <ErrorMessage
          errors={props.errors}
          name="email"
          render={({ message }) => (
            <span className={classNames("text-red-600", "ml-1")}>
              <ExclamationIcon className={classNames("inline-icon", "mr-1")} />
              {message}
            </span>
          )}
        />
        <input {...props.register("email")} disabled={props.loading} />
      </label>
      <Button type="submit" center loading={props.loading}>
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
