import { Card } from "./Card";
import { useGroup } from "../../hooks/use-group";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../Task";

export function Home() {
  const params = useParams();
  const userId = "65639acd0b6dee64d0192850";
  const tasksQuery = useGroup(userId, params.groupId);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `http://localhost:3501/users/${userId}/${params.groupId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userGroup"]);
    },
  });

  const groupName = tasksQuery.isLoading ? "" : tasksQuery.data.data.group_name;
  const tasks = tasksQuery.isLoading ? [] : tasksQuery.data.data.data;
  if (tasksQuery.isLoading) return <h1>Loading..</h1>;
  return (
    <div className="flex-1 bg-sidebar p-16 text-white overflow-auto flex justify-between">
      <div>
        <h1 className="text-xl font-medium mb-4 flex gap-5 items-center">
          {groupName}
          <Link
            to="/"
            onClick={async () => mutateAsync()}
            className="text-red-600 text-sm font-medium opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
          >
            Delete
          </Link>
        </h1>
        <ul className="flex flex-col gap-2">
          <div className="w-[30rem] py-1  text-[#007AFF] opacity-35 hover:opacity-100 transition-opacity duration-150 cursor-pointer font-medium">
            + Add new
          </div>
          {tasks.map((task) => {
            console.log(task);
            return (
              <Card
                group_id={params.groupId}
                userId={userId}
                key={task.task_name}
                {...task}
              />
            );
          })}
        </ul>
      </div>
      <Task />
    </div>
  );
}
