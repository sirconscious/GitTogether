// src/components/DarkModeToggle.tsx
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
    >
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </Button>
  );
}
