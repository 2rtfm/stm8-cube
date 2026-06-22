import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/utils";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, toggleDark] = useDarkMode();
  return (
    <div className="flex flex-col h-screen">
      <div className="px-4 p-2 h-12 flex justify-between border-b items-center shrink-0">
        <div className="text-xl">Cube</div>
        <Button variant="outline" onClick={toggleDark} size="icon-sm">
          {isDark ? <Moon /> : <Sun />}
        </Button>
      </div>
      <main className="flex-1 min-h-0 w-full">{children}</main>
    </div>
  );
}
