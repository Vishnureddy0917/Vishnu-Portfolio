"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [initialized, setInitialized] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  };

  // Initial theme initialization from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme") as Theme | null;
    let targetTheme: Theme = "light";
    if (saved === "dark" || saved === "light") {
      targetTheme = saved;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      targetTheme = "dark";
    }
    setThemeState(targetTheme);
    applyTheme(targetTheme);
    setInitialized(true);
  }, []);

  // Sync DOM & localStorage whenever theme is explicitly changed by user
  useEffect(() => {
    if (!initialized) return;
    applyTheme(theme);
    localStorage.setItem("portfolio_theme", theme);
  }, [theme, initialized]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
