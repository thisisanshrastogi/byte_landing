"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import useIsMobile from "./mobile-detector";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const isMobile = useIsMobile();

  const next = theme === "light" ? "dark" : "light";

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    // 🚫 Mobile = NO View Transition
    if (!document.startViewTransition || isMobile) {
      setTheme(next);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);

    // @ts-ignore
    document.startViewTransition(() => {
      setTheme(next);
    });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="relative h-9 w-9 px-0"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
