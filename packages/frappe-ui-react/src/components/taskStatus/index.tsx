const statusVariants: Record<string, string> = {
  Open: "bg-blue-100 text-blue-500 hover:bg-blue-200",
  Working: "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30",
  "Pending Review": "bg-orange-100 text-orange-400 hover:bg-orange-500/20",
  Overdue: "bg-red-500/20 text-red-500 hover:bg-red-500/20",
  Template: "bg-slate-200 text-slate-900 hover:bg-slate-200",
  Completed: "bg-green-600/20 text-green-600 hover:bg-green-600/20",
  Cancelled: "bg-red-500/20 text-red-500 hover:bg-red-500/20",
};

export type TaskStatusProps =
  | "Open"
  | "Working"
  | "Pending Review"
  | "Overdue"
  | "Template"
  | "Completed"
  | "Cancelled";

interface TaskStatusComponentProps {
  status: TaskStatusProps;
}

const TaskStatus = ({ status }: TaskStatusComponentProps) => {
  const variantClass = statusVariants[status] || statusVariants["Open"];

  return (
    <div
      title={status}
      className={`
        ${variantClass} py-1 px-2 truncate w-fit max-w-40 text-xs font-bold text-center cursor-pointer rounded-full
      `}
    >
      {status}
    </div>
  );
};

export default TaskStatus;
