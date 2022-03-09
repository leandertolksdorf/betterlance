import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ProjectWithCustomer } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { Loading } from "../Loading";
import { ProjectListView } from "./view";

export const ProjectList = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectWithCustomer[] | undefined>(
    undefined
  );

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<ProjectWithCustomer>("project")
        .select("*, customer(*)")
        .order("name");
      if (error) throw error;
      setProjects(data);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
    const subscription = supabase
      .from<definitions["project"]>("project")
      .on("*", loadProjects)
      .subscribe();
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  if (loading || projects === undefined) {
    return <Loading />;
  } else {
    return <ProjectListView projects={projects} />;
  }
};
