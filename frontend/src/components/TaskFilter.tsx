interface TaskFilterProps {
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  const filters: { label: string; value: "all" | "active" | "completed" }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${currentFilter === filter.value ? "bg-blue-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
