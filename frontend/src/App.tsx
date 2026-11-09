import React, { useEffect, useState } from "react";
import type { Task } from "./types";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { SearchBar } from "./components/SearchBar";
import { TaskItem } from "./components/TaskItem";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize dark mode state from localStorage or default to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("flow_theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  // Synchronize dark mode state with localStorage and HTML class
  useEffect(() => {
    localStorage.setItem("flow_theme", isDarkMode ? "dark" : "light");

    // Toggle the "dark" class on the root html element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fetch all tasks from backend on initial load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle create a new task
  const handleAddTask = async (title: string) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Handle toggle task completion status
  const handleToggleTask = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });

      if (response.ok) {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !currentStatus } : task,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Handle delete task by id
  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Filter tasks in real-time based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen py-12 transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-white">
      <div className="max-w-md mx-auto p-6 rounded-2xl shadow-xl border transition-all duration-300 bg-white border-gray-100 text-gray-800 dark:bg-slate-900 dark:border-slate-800 dark:text-white">
        <Header
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <TaskForm onAddTask={handleAddTask} />

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <ul className="space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-sm py-4 text-gray-400 dark:text-slate-500">
              {tasks.length === 0
                ? "No tasks yet. Create one above!"
                : "No matching tasks found."}
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
