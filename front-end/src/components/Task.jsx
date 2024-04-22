import trashIcon from "../assets/trash.svg";
export function Task() {
  return (
    <div className="bg-default rounded-lg h-full w-96 p-8">
      <form className="flex flex-col items-center gap-4 child:flex child:flex-col">
        <div className="w-full relative">
          <input
            className="bg-[#181818] px-4 pb-3 pt-6 w-full rounded-md focus:outline-none peer text-sm"
            name="task_name"
            type="text"
            placeholder=""
          />
          <label
            className="absolute text-xs peer-placeholder-shown:text-sm peer-focus:text-xs left-4 top-[0.4rem] peer-placeholder-shown:top-[1.125rem] peer-focus:top-[0.4rem]  peer-placeholder-shown:text-secondary-text text-[#007AFF] peer-focus:text-[#007AFF] transition-all duration-300 ease-in-out"
            htmlFor="task_name"
          >
            Task Name
          </label>
        </div>
        <div className="relative w-full">
          <textarea
            className="bg-[#181818] px-4 pb-3 pt-6 w-full rounded-md focus:outline-none text-sm peer resize-none"
            name="task_description"
            type="text"
            placeholder=""
            rows={4}
          />
          <label
            className="absolute text-xs peer-placeholder-shown:text-sm peer-focus:text-xs left-4 top-[0.4rem] peer-placeholder-shown:top-[1.125rem] peer-focus:top-[0.4rem]  peer-placeholder-shown:text-secondary-text text-[#007AFF]  peer-focus:text-[#007AFF] transition-all duration-300 ease-in-out bg-[#181818] w-[90%]"
            htmlFor="task_description"
          >
            Task Description
          </label>
        </div>

        <div>
          <label htmlFor="task_description">Due date:</label>
          <input name="task_date" type="date" />
        </div>
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
