"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the shape of the context state
interface ColorSchemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Create the context with a default value
export const ColorSchemeContext = createContext<
  ColorSchemeContextType | undefined
>(undefined);

// Provider component
export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newTheme;
    });
  };

  // Sync theme with system preferences
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const applyTheme = (isDark: boolean) => {
      setTheme(isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    };

    applyTheme(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);

    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ColorSchemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

// Hook to use the context
export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }
  return context;
};
