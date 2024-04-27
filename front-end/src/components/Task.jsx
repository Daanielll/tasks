import { useState } from "react";
import trashIcon from "../assets/trash.svg";
import chevron from "../assets/chevron.svg";
export function Task() {
  const [showDropdown, setShowDropdown] = useState(false);
  const groups = ["Group 1", "Group 2", "Group 3"];
  return (
    <div className="bg-dark rounded-lg h-full w-96 p-6">
      <h1>Task settings</h1>
      <form className="flex flex-col items-center gap-5">
        <div className="w-full text-sm mt-8 flex justify-between items-center">
          <label className="text-secondary-text w-44" htmlFor="task_name">
            Name
          </label>
          <input
            className="bg-sidebar p-2 px-3 focus:outline-none focus:ring-1 ring-secondary-text border-2 border-default rounded-xl w-full"
            id="task_name"
            type="text"
          />
        </div>
        <div className="w-full text-sm flex justify-between items-start">
          <label
            className="text-secondary-text w-44"
            htmlFor="task_description"
          >
            Description
          </label>
          <textarea
            className="bg-sidebar p-2 px-3 focus:outline-none focus:ring-1 ring-secondary-text border-2 border-default rounded-xl w-full -mt-2 resize-none"
            id="task_description"
            type="text"
            placeholder=""
            rows={2}
          />
        </div>
      </form>
    </div>
  );
}
