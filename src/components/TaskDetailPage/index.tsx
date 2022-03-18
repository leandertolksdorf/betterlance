import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { TaskWithProject } from "../../types/composite";
import { definitions } from "../../types/supabase";
import { ErrorPage } from "../ErrorPage";
import { TaskDetailPageView } from "./view";

export const TaskDetailPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [task, setTask] = useState<TaskWithProject | undefined>(undefined);

  useEffect(() => {
    loadTask();
    const subscription = supabase
      .from<definitions["task"]>("task")
      .on("*", loadTask)
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  const loadTask = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<TaskWithProject>("task")
        .select("*, project(*)")
        .eq("id", router.query.id as string);
      if (error) throw error;
      setTask(data[0] || null);
    } catch (error: any) {
      setErrorMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (errorMessage || task === null) {
    return <ErrorPage message={errorMessage} />;
  } else {
    return <TaskDetailPageView task={task} />;
  }
};
