import { NextPage } from "next";
import React from "react";
import { TaskDetailPage } from "../../../components/TaskDetailPage";
import { enforceAuthenticated } from "../../../util/enforceAuthenticated";

export const getServerSideProps = enforceAuthenticated();

const TaskDetailRoute: NextPage = () => {
  return <TaskDetailPage />;
};

export default TaskDetailRoute;
