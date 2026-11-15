import { useState } from "react";
import type { Priority, Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, currentStatus: boolean) => void;
  onUpdateDescription: (id: number, description: string) => Promise<void>;
  onDelete: (id: number) => void;
}

const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50",
  medium:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
  low: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
};

export function TaskItem({
  task,
  onToggle,
  onUpdateDescription,
  onDelete,
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteDraft, setNoteDraft] = useState(task.description ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNote = async () => {
    setIsSaving(true);
    try {
      await onUpdateDescription(task.id, noteDraft);
      setIsExpanded(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <li
      key={task.id}
      className="flex items-center justify-between p-3 rounded-xl transition-all border bg-gray-50 border-gray-100 hover:bg-gray-100/80 dark:bg-slate-800/50 dark:border-slate-800 dark:hover:bg-slate-800"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id, task.isCompleted)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
          <div className="min-w-0 flex-1">
            <span
              className={`text-sm font-medium transition-all ${task.isCompleted ? "line-through text-gray-400 dark:text-slate-500" : "text-gray-700 dark:text-slate-200"}`}
            >
              {task.title}
            </span>
            {task.description && !isExpanded && (
              <p className="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${priorityStyles[task.priority || "medium"]}`}
          >
            {task.priority || "medium"}
          </span>
          <button
            type="button"
            onClick={() => {
              setNoteDraft(task.description ?? "");
              setIsExpanded((prev) => !prev);
            }}
            className="text-xs font-medium px-2 py-1 rounded text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700 cursor-pointer transition-colors"
          >
            {isExpanded ? "Close" : task.description ? "Edit Note" : "+ Note"}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700 space-y-2">
          <textarea
            rows={4}
            placeholder="Write detailed note, links, or context..."
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300 text-gray-900 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-3 py-1 text-xs rounded-lg text-gray-600 hover:bg-gray-200 dark:text-slate-400 dark:hover:bg-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={isSaving}
              onClick={handleSaveNote}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
