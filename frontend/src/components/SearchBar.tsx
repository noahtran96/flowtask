interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search task..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
      />
    </div>
  );
}
