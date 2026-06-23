import { useCallback, useState } from "react";

export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState(() => {
    const shouldBeDark = localStorage.getItem("cube:darkMode") === "true";
    document.body.classList.toggle("dark", shouldBeDark);
    return shouldBeDark;
  });

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("cube:darkMode", String(next));
      document.body.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return [isDark, toggleDark];
}
