import Nav from "./nav";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ThemeContext } from "../context/context";

export default function Layout({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <div className={styles.container}>
        <Nav />
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
