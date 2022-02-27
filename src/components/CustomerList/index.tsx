import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { CustomerListView } from "./view";

export const CustomerList = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<any>([]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<definitions["customer"]>("customer")
        .select();
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
  }, []);
  return <CustomerListView loading={loading} customers={customers} />;
};
