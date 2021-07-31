import Head from "next/head";
import styles from "../styles/Home.module.css";
import {} from "react-icons/fa";

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
      </nav>
    </div>
  );
}
