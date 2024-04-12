import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (user) => {
  return useQuery({
    queryKey: ["userProfileAndGroups", user],
    queryFn: async () => {
      const results = await Promise.all([
        axios
          .get(`http://localhost:3500/users/${user}`)
          .then((res) => res.data),
        axios
          .get(`http://localhost:3500/users/${user}/groups`)
          .then((res) => res.data),
      ]);
      const [profile, groups] = results;
      return { profile, groups };
    },
  });
};
