import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useNewGroup = (user) => {
  // Make sure `user` is either a prop or a defined variable in this context

  return useMutation(async (newGroupName) => {
    const { data } = await axios.post(
      `http://localhost:3500/users/${user}/groups`,
      {
        newGroupName, // Assuming the API expects an object with a 'name' property
      }
    );
    return data; // Return the response data directly
  });
};
