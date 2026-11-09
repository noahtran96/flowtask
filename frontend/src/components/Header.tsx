interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        FlowTask
      </h2>
      <button
        onClick={onToggleDarkMode}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer bg-slate-800 text-white hover:bg-slate-700 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
