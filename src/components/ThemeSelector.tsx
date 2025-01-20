import { useState, useEffect } from "react";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import useLocalStorage from "@/hooks/useLocalStorage";

export default function ThemeSelector() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="border-solid border-black dark:border-white rounded p-2">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center justify-center p-2"
      >
        {darkMode ? (
          <div className="text-gray-100 flex items-center">
            <Brightness7Icon className="h-6 w-6 mr-2" /> Dark
          </div>
        ) : (
          <div className="text-gray-800 items-center">
            <Brightness4Icon className="h-6 w-6 mr-2" /> Light
          </div>
        )}
      </button>
    </div>
  );
}
