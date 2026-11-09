import type React from "react";
import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [inputTitle, setInputTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    await onAddTask(inputTitle);
    setInputTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Input new task..."
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors bg-white border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 p-2 rounded-lg font-medium transition-colors cursor-pointer text-sm shadow-sm"
      >
        Create
      </button>
    </form>
  );
}
