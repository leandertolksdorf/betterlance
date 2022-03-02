import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { NotFoundPage } from "../NotFoundPage";
import { CustomerDetailPageView } from "./view";

export const CustomerDetailPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<definitions["customer"] | null>(
    null
  );
  useEffect(() => {
    loadCustomer();
    const subscription = supabase
      .from<definitions["customer"]>("customer")
      .on("*", loadCustomer)
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadCustomer = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<definitions["customer"]>("customer")
        .select()
        .eq("id", router.query.id as string);
      if (error) throw error;
      setCustomer(data![0]);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return loading || customer ? (
    <CustomerDetailPageView loading={loading} customer={customer} />
  ) : (
    <NotFoundPage />
  );
};
