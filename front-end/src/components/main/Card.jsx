import { format, parseISO } from "date-fns";

export function Card({ task_name, description, created_at, due_date, status }) {
  return (
    <>
      <div className="w-[30rem] p-3 rounded-md bg-default flex flex-col justify-between cursor-pointer hover:translate-x-1 transition-transform duration-200">
        <div className="flex gap-4 items-center">
          <div className="w-8 h-5 p-1 rounded-full border border-secondary-text">
            <div
              className={`h-full aspect-square rounded-full relative transition-all duration-150 ${
                status == "todo"
                  ? "translate-x-0 bg-white"
                  : status == "in-progress"
                  ? "translate-x-[6px] bg-orange-400"
                  : "translate-x-[12px] bg-secondary-text"
              }`}
            ></div>
          </div>
          <div
            className={`${
              status == "completed"
                ? "child:line-through text-secondary-text"
                : ""
            }`}
          >
            <h1>{task_name}</h1>
            {due_date && (
              <h3 className="text-sm text-secondary-text">
                {format(parseISO(due_date), "EEE, dd MMM yyyy")}
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
