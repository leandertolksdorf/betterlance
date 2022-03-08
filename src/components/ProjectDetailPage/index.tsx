import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ProjectWithCustomer } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { ErrorPage } from "../ErrorPage";
import { ProjectDetailPageView } from "./view";

export const ProjectDetailPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<
    ProjectWithCustomer | null | undefined
  >(undefined);

  useEffect(() => {
    loadProject();
    const subscription = supabase
      .from<definitions["project"]>("project")
      .on("*", loadProject)
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadProject = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<ProjectWithCustomer>("project")
        .select("*, customer(*)")
        .eq("id", router.query.id as string);
      if (error) throw error;
      setProject(data[0] || null);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return project === null ? (
    <ErrorPage />
  ) : (
    <ProjectDetailPageView loading={loading} project={project} />
  );
};
