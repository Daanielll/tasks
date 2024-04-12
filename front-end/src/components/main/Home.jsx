import { useMemo } from "react";
import { Card } from "./Card";
import { useGroup } from "../../hooks/use-group";
import { useParams } from "react-router-dom";

export function Home() {
  const params = useParams();
  console.log(params.groupId);
  const tasksQuery = useGroup("65639acd0b6dee64d0192850", params.groupId);
  const tasks = tasksQuery.isLoading ? [] : tasksQuery.data.data.data;
  if (tasksQuery.isLoading) return <h1>Loading..</h1>;
  return (
    <div className="flex-1 bg-sidebar p-16 text-white overflow-auto">
      <h1 className="text-xl font-medium mb-4">Sunday</h1>
      <ul className="flex flex-col gap-2">
        <div className="w-[30rem] py-1  text-[#007AFF] opacity-35 hover:opacity-100 transition-opacity duration-150 cursor-pointer font-medium">
          + Add new
        </div>
        {tasks.map((task) => {
          return <Card key={task.task_name} {...task} />;
        })}
      </ul>
    </div>
  );
}
