import React, { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormData } from ".";

type AuthFormViewProps = {
  loading: boolean;
  register: UseFormRegister<FormData>;
  onSubmit: FormEventHandler;
  errors: FieldErrors;
};

export const AuthFormView = (props: AuthFormViewProps) => {
  return (
    <form onSubmit={props.onSubmit}>
      <label>
        Email
        <input {...props.register("email")} />
      </label>
      <button type="submit">Anmelden</button>
    </form>
  );
};
