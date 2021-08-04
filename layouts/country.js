import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { myLoader } from "../layouts/loader";
import { useRouter } from "next/router";

export default function Country({ data }) {
  const router = useRouter();
  const { flag, name, region, population, capital } = data;

  const changeRoute = (event) => {
    event.preventDefault();

    router.push(`/country/${name}`, undefined, { shallow: true });
  };
  return (
    <>
      <Link href={`/country/${encodeURIComponent(name)}`} onClick={changeRoute}>
        <a>
          <div className={styles.country}>
            <div className={styles.flagContainer}>
              <Image
                loader={myLoader}
                src={flag}
                alt={name}
                width={375}
                height={220}
              />
            </div>
            <div className={styles.details}>
              <h3>{name}</h3>
              <p>
                Population: <span>{population}</span>
              </p>
              <p>
                Region: <span>{region}</span>
              </p>
              <p>
                Capital: <span>{capital}</span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}
