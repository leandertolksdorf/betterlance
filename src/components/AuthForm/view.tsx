import React from "react";

type AuthFormViewProps = {
  loading: boolean;
  email: string;
  setEmail: (email: string) => void;
  handleLogin: () => void;
};

export const AuthFormView = (props: AuthFormViewProps) => {
  return (
    <div>
      <label>
        Email
        <input
          id="email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        />
      </label>
      <button onClick={(e) => props.handleLogin()} disabled={props.loading}>
        {props.loading ? "Ich arbeite..." : "Anmelden"}
      </button>
    </div>
  );
};
