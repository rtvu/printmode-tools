import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

export function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>("isDarkTheme", false);

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (!event.altKey && event.ctrlKey && !event.metaKey && !event.shiftKey && event.key === "i") {
        setIsDarkTheme(!isDarkTheme);
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [isDarkTheme, setIsDarkTheme]);

  return (
    <div className="navbar bg-base-content px-8 py-3">
      <div className="navbar-start"></div>
      <div className="navbar-center text-base-100 text-5xl">Printmode Tools</div>
      <div className="navbar-end">
        <label className="toggle border-base-100 text-base-content">
          <input
            type="checkbox"
            value="dark"
            className="theme-controller"
            checked={isDarkTheme}
            onChange={() => setIsDarkTheme(!isDarkTheme)}
          />
          <SunIcon />
          <MoonIcon />
        </label>
      </div>
    </div>
  );
}
