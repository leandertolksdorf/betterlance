import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { Loading } from "../Loading";
import { CustomerListView } from "./view";

export const CustomerList = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<
    definitions["customer"][] | undefined
  >();

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<definitions["customer"]>("customer")
        .select()
        .order("name");
      if (error) throw error;
      setCustomers(data);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();

    const subscription = supabase
      .from<definitions["customer"]>("customer")
      .on("*", loadCustomers)
      .subscribe();
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  if (loading || customers === undefined) {
    return <Loading />;
  } else {
    return <CustomerListView customers={customers} />;
  }
};
