import { useState } from "react";
import { useUser } from "../hooks/use-user";
import { Link } from "react-router-dom";
import { useNewGroup } from "../hooks/use-new-group";
import axios from "axios";
import useMutation from "@tanstack/react-query";

export function Sidebar() {
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const userId = "65639acd0b6dee64d0192850";
  const userData = useUser(userId);

  const groups = userData.isFetched ? userData.data.groups.data : [];
  const user = userData.isFetched ? userData.data.profile.user : {};
  if (userData.isLoading) return <h1>Loading..</h1>;

  // const {
  //   mutateAsync: addTodoMutation,
  // } = () => {
  //   return useMutation(async (newGroupName) => {
  //     const { data } = await axios.post(
  //       `http://localhost:3500/users/${userId}/groups`,
  //       {
  //         group_name: newGroupName,
  //       }
  //     );
  //     return data;
  //   });
  // };

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: async (newGroupName) => {
      await axios.post("http://localhost:3500/users/${userId}/groups", {
        group_name: newGroupName,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the form from submitting in the default way
    try {
      await addTodoMutation(groupName);
      setGroupName("");
    } catch (e) {
      console.log(e);
    }
    setShowNewGroup(false); // Outputs the current input value to the console
  };
  return (
    <>
      <div className="w-64 p-4 bg-sidebar text-white border-r-2 border-[#2b2b2b]">
        {/* User details */}
        <div className="flex gap-4 items-center justify-center my-4">
          <div
            style={{ backgroundColor: user.color }}
            className="rounded-full w-8 h-8"
          ></div>
          <div>
            <h3 className="text-sm">{user.username}</h3>
            <h4 className="text-secondary-text font-thin text-sm">
              {user.email}
            </h4>
          </div>
        </div>

        {/* User library */}
        <h5 className="text-sm text-secondary-text mt-8 mb-1 font-light mx-2">
          Library
        </h5>
        <ul className="text-white font-light text-sm flex flex-col gap-1 mb-2 child:cursor-pointer">
          <Link
            onClick={() => console.log(groups[0]._id)}
            to={`/`}
            className="hover:bg-[#262626] p-2 px-4 rounded-md flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#007AFF"
              height="18"
              viewBox="0 -960 960 960"
              width="18"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q38 0 69-22t43-58h168v-360H200v360h168q12 36 43 58t69 22ZM200-200h560-560Z" />
            </svg>
            <span>Inbox</span>
          </Link>
        </ul>

        {/* User Groups */}
        <h5 className="text-sm text-secondary-text mt-8 mb-2 font-light flex justify-between group mx-2">
          Groups
          <span
            onClick={() => setShowNewGroup(!showNewGroup)}
            className="text-white font-medium text-xs underline opacity-30 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            New
          </span>
        </h5>
        <form
          onSubmit={handleSubmit}
          className={`${showNewGroup ? "block" : "hidden"}`}
        >
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            className="bg-default p-2"
          />
          <button type="button" onClick={() => setShowNewGroup(false)}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </form>
        <ul className="text-white font-light text-sm flex flex-col gap-1 mb-2 child:cursor-pointer">
          {groups.map((gr, i) => {
            if (i == 0) return;
            return (
              <Link
                key={gr._id}
                className="hover:bg-[#262626] p-2 px-4 rounded-md flex gap-2 items-center"
                to={`/group/${gr._id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#a9a9a9"
                  height="18"
                  viewBox="0 -960 960 960"
                  width="18"
                >
                  <path d="M240-600h480v-200H240v200Zm0 80q-33 0-56.5-23.5T160-600v-200q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v200q0 33-23.5 56.5T720-520H240Zm0 360h480v-200H240v200Zm0 80q-33 0-56.5-23.5T160-160v-200q0-33 23.5-56.5T240-440h480q33 0 56.5 23.5T800-360v200q0 33-23.5 56.5T720-80H240Zm0-520v-200 200Zm0 440v-200 200Z" />
                </svg>
                <span>{gr.group_name}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
