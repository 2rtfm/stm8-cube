import { useState } from "react";

export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("cube:darkMode");
    const shouldBeDark = stored === "true";
    if (shouldBeDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    return shouldBeDark;
  });

  const toggleDark = () => {
    setIsDark((state) => {
      const newState = !state;
      localStorage.setItem("cube:darkMode", String(newState));
      if (newState) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return newState;
    });
  };

  return [isDark, toggleDark];
}
