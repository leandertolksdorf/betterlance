import { GetServerSideProps } from "next";
import { supabase } from "../lib/supabase";

export const enforceAuthenticated: (
  callback?: GetServerSideProps
) => GetServerSideProps = (callback) => {
  return async (context) => {
    const { req } = context;
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      return { props: {}, redirect: { destination: "/" } };
    }

    if (callback) {
      return callback(context);
    }

    return { props: {} };
  };
};
