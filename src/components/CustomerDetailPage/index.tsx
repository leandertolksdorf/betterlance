import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { NotFoundPage } from "../NotFoundPage";
import { CustomerDetailPageView } from "./view";

export const CustomerDetailPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<
    definitions["customer"] | null | undefined
  >(undefined);
  const [projects, setProjects] = useState<
    definitions["project"][] | undefined
  >(undefined);

  useEffect(() => {
    loadCustomerAndProjects();
    const subscription = supabase
      .from<definitions["customer"]>("customer")
      .on("*", loadCustomerAndProjects)
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadCustomerAndProjects = async () => {
    try {
      setLoading(true);
      const { data: customers, error: customersError } = await supabase
        .from<definitions["customer"]>("customer")
        .select()
        .eq("id", router.query.id as string);
      if (customersError) throw customersError;
      setCustomer(customers![0]);

      const { data: projects, error: projectsError } = await supabase
        .from<definitions["project"]>("project")
        .select()
        .eq("customer", router.query.id as string);
      if (projectsError) throw projectsError;
      setProjects(projects);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return loading || customer ? (
    <CustomerDetailPageView
      loading={loading}
      customer={customer}
      projects={projects}
    />
  ) : (
    <NotFoundPage />
  );
};
