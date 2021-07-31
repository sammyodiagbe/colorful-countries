import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FaMoon, FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Colorful Countries</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="author" content="Odiagbe Samson Osaro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.navigation}>
        <h4>Where in the world?</h4>
        <button>
          <FaMoon className={styles.buttonIcon} />
          Dark mode
        </button>
      </nav>
      <div className={styles.inputAndFilterContainer}>
        <div className={styles.inputContainer}>
          <FaSearch />
          <input type="text" placeholder="Search for a country" />
        </div>
        <div className={styles.filter}>
          <select>
            <option selected disabled>
              Filter by Region
            </option>
            <option>Africa</option>
            <option>America</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Oceania</option>
          </select>
        </div>
      </div>
      <div className={styles.countriesContainer}></div>
    </div>
  );
}
