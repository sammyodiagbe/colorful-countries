import styles from "../styles/Country.module.css";
import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `${src}`;
};

export default function Country({ data }) {
  const { flag, name, region, population, capital } = data;
  return (
    <div className={styles.country}>
      <div className={styles.flagContainer}>
        <Image
          loader={myLoader}
          src={flag}
          alt={name}
          width={375}
          height={300}
        />
      </div>
      <div className={styles.details}>
        <h2>{name}</h2>
        <h3>
          Population: <span>{population}</span>
        </h3>
        <h3>
          Region: <span>{region}</span>
        </h3>
        <h3>
          Capital: <span>{capital}</span>
        </h3>
      </div>
    </div>
  );
}
