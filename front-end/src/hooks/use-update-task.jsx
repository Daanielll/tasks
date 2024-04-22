import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTask = (userId, taskId, groupId) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (updates) => {
      await axios.patch(
        `http://localhost:3501/users/${userId}/${groupId}/${taskId}`,
        updates
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userGroup"]);
    },
  });

  return mutateAsync; // Return the mutateAsync function directly
};
