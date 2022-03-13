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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [project, setProject] = useState<ProjectWithCustomer | undefined>(
    undefined
  );

  useEffect(() => {
    loadProject();
    const subscription = supabase
      .from<definitions["project"]>("project")
      .on("*", loadProject)
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
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

  if (!project) {
    return "Loading";
  } else if (project) {
    return <ProjectDetailPageView loading={loading} project={project} />;
  } else {
    return <ErrorPage message={errorMessage} />;
  }
};
