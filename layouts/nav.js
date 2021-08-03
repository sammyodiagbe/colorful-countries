import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../context/context";
import { useContext } from "react";
import styles from "../styles/Home.module.css";

export default function Nav() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <h4>Where in the world?</h4>
        {theme === "dark" ? (
          <button onClick={toggleTheme}>
            <FaSun className={styles.buttonIcon} />
            Light mode
          </button>
        ) : (
          <button onClick={toggleTheme}>
            <FaMoon className={styles.buttonIcon} />
            Dark mode
          </button>
        )}
      </div>
    </nav>
  );
}
