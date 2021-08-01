import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "../context/context";
import { useContext } from "react";
import styles from "../styles/Home.module.css";

export default function Nav() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={styles.navigation}>
      <h4>Where in the world?</h4>
      <button onClick={toggleTheme}>
        <FaMoon className={styles.buttonIcon} />
        Dark mode
      </button>
    </nav>
  );
}
