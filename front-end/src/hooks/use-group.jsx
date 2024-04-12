import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGroup = (user, group) => {
  return useQuery({
    queryKey: ["userGroup", group],
    queryFn: async () => {
      const groupTasks = axios.get(
        `http://localhost:3500/users/${user}/${group}`
      );

      return groupTasks;
    },
  });
};
