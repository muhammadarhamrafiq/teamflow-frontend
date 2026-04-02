import { useThemeStore } from "@/app/providers/themeProvider";
import { Moon02Icon, Sun } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 text-xs md:flex">
      <button
        className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold transition cursor-pointer ${
          theme === "light"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => setTheme("light")}
        type="button"
      >
        <HugeiconsIcon icon={Sun} size={14} />
        Light
      </button>
      <button
        className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold transition cursor-pointer ${
          theme === "dark"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => setTheme("dark")}
        type="button"
      >
        <HugeiconsIcon icon={Moon02Icon} size={14} />
        Dark
      </button>
    </div>
  );
};

export default ThemeSwitch;
