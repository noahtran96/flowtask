import type { Priority, Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
}

const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50",
  medium:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
  low: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li
      key={task.id}
      className="flex items-center justify-between p-3 rounded-xl transition-all border bg-gray-50 border-gray-100 hover:bg-gray-100/80 dark:bg-slate-800/50 dark:border-slate-800 dark:hover:bg-slate-800"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id, task.isCompleted)}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
        />
        <span
          className={`text-sm font-medium transition-all ${task.isCompleted ? "line-through text-gray-400 dark:text-slate-500" : "text-gray-700 dark:text-slate-200"}`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${priorityStyles[task.priority || "medium"]}`}
        >
          {task.priority || "medium"}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
      >
        Delete
      </button>
    </li>
  );
}
