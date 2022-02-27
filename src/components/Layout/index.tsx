import React, { ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import { LayoutView } from "./view";

export type LayoutProps = {
  showNavigation?: boolean;
  children?: ReactNode;
  title?: string;
};

export const Layout = (props: LayoutProps) => {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };
  return <LayoutView {...props} onSignOut={handleSignOut} />;
};
