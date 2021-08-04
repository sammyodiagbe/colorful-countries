import Nav from "./nav";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { ThemeContext } from "../context/context";

export default function Layout({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    setTheme(!theme ? "light" : theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <main
        className={`${styles.container} ${theme === "dark" && styles.dark}`}
      >
        <Nav />
        {children}
      </main>
    </ThemeContext.Provider>
  );
}
