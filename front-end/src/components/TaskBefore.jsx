import { useState } from "react";
import trashIcon from "../assets/trash.svg";
import chevron from "../assets/chevron.svg";
export function Task() {
  const [showDropdown, setShowDropdown] = useState(false);
  const groups = ["Group 1", "Group 2", "Group 3"];
  return (
    <div className="bg-default rounded-lg h-full w-96 p-8">
      <form className="flex flex-col items-center gap-4">
        <div className="w-full relative">
          <input
            className="bg-[#181818] px-4 pb-3 pt-6 w-full rounded-md focus:outline-none peer text-sm "
            id="task_name"
            type="text"
            placeholder=""
          />
          <label
            className="absolute text-xs peer-placeholder-shown:text-sm peer-focus:text-xs left-4 top-[0.4rem] peer-placeholder-shown:top-[1.125rem] peer-focus:top-[0.4rem]  peer-placeholder-shown:text-secondary-text text-[#007AFF] peer-focus:text-[#007AFF] transition-all duration-300 ease-in-out cursor-text"
            htmlFor="task_name"
          >
            Task Name
          </label>
        </div>
        <div className="relative w-full">
          <textarea
            className="bg-[#181818] px-4 pb-3 pt-6 w-full rounded-md focus:outline-none text-sm peer resize-none"
            id="task_description"
            type="text"
            placeholder=""
            rows={4}
          />
          <label
            className="absolute text-xs peer-placeholder-shown:text-sm peer-focus:text-xs left-4 top-[0.4rem] peer-placeholder-shown:top-[1.125rem] peer-focus:top-[0.4rem]  peer-placeholder-shown:text-secondary-text text-[#007AFF]  peer-focus:text-[#007AFF] transition-all duration-300 ease-in-out bg-[#181818] w-[90%] cursor-text"
            htmlFor="task_description"
          >
            Task Description
          </label>
        </div>
        {/* <div className="flex gap-4 text-secondary-text w-full text-sm px-1 items-center">
          <h1>Group:</h1>
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-sidebar p-2 pr-10 pl-6 rounded-md relative cursor-pointer"
            >
              {groups[1]}
              <img
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 "
                src={chevron}
                alt=""
              />
            </div>
            <ul
              className={`${
                showDropdown ? "block" : "hidden"
              } bg-sidebar rounded-md mt-1 overflow-hidden py-2 absolute`}
            >
              {groups.map((groupName) => {
                return (
                  <li className="w-full hover:bg-default px-8 py-1">
                    {groupName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div> */}

        {/* <div>
          <label htmlFor="task_description">Due date:</label>
          <input name="task_date" type="date" />
        </div> */}
        {/* <div>
          <h3>Priority</h3>
          <div className="child:w-2 child:h-2 child:border flex gap-2">
            <button></button>
            <button></button>
            <button></button>
          </div>
        </div>
        <div className="flex justify-between flex-row">
          <button>Cancel</button>
          <button>Submit</button>
          <img className="size-6" src={trashIcon} alt="" />
        </div> */}
      </form>
    </div>
  );
}
