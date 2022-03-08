import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { definitions } from "../../types/supabase";
import { Loading } from "../Loading";
import { ProjectListItemResource } from "../ProjectListItem";
import { ProjectListView } from "./view";

export const ProjectList = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<
    ProjectListItemResource[] | null | undefined
  >();

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<ProjectListItemResource>("project")
        .select("*, customer(name)")
        .order("name");
      console.log(data);
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
      subscription.unsubscribe();
    };
  }, []);

  return projects === undefined || loading ? (
    <Loading />
  ) : projects === null ? null : (
    <ProjectListView projects={projects} />
  );
};