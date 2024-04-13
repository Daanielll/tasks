import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const {
  mutateAsync: addTodoMutation,
} = (user) => {
  return useMutation(async (newGroupName) => {
    const { data } = await axios.post(
      `http://localhost:3500/users/${user}/groups`,
      {
        group_name: newGroupName,
      }
    );
    return data;
  });
};
