import { Moon, Sun } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/utils";

const DarkModeToggleRaw = () => {
  const [isDark, toggleDark] = useDarkMode();
  return (
    <Button variant="outline" onClick={toggleDark} size="icon-sm">
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
};

const DarkModeToggle = memo(DarkModeToggleRaw);

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-svh">
      <div className="px-4 p-2 h-12 flex justify-between border-b items-center shrink-0">
        <div className="text-xl">Cube</div>
        <DarkModeToggle />
      </div>
      <main className="flex-1 min-h-0 w-full">{children}</main>
    </div>
  );
}
