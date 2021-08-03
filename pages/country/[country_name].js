import country from "../../styles/Country.module.css";
import Layout from "../../layouts/Layout";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { myLoader } from "../../layouts/loader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Country({ data }) {
  const {
    name,
    region,
    languages,
    nativeName,
    borders,
    capital,
    topLevelDomain,
    subregion,
    population,
    currencies,
    flag,
  } = data;
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Layout>
        <div className={country.container}>
          <div className={country.goBack}>
            <Link href="/">
              <a>
                <FaArrowLeft className={country.linkicon} />
                Go back
              </a>
            </Link>
          </div>
          <div className={country.wrapper}>
            <div className={country.flagContainer}>
              <Image
                loader={myLoader}
                src={flag}
                alt={`${name}'s flag`}
                width={500}
                height={300}
              />
            </div>
            <div className={country.detailsContainer}>
              <h2>{name}</h2>
              {/* details */}

              <div className={country.details}>
                <div className={country.left}>
                  <p className={country.detail}>
                    Native Name: <span>{nativeName}</span>
                  </p>
                  <p className={country.detail}>
                    Population <span>{population}</span>
                  </p>
                  <p className={country.detail}>
                    Region: <span>{region}</span>
                  </p>
                  <p className={country.detail}>
                    Sub Region: <span>{subregion}</span>
                  </p>
                  <p className={country.detail}>
                    Capital: <span>{capital}</span>
                  </p>
                </div>
                <div className={country.right}>
                  <p className={country.detail}>
                    Top Level Domain: <span>{topLevelDomain[0]}</span>
                  </p>

                  <p className={country.detail}>
                    Currencies:{" "}
                    <span>
                      {currencies.map((currency, index) => (
                        <span key={index}>{currency.name},</span>
                      ))}
                    </span>
                  </p>
                  <p className={country.detail}>
                    Languages:{" "}
                    <span>
                      {languages.map((lang, index) => (
                        <span key={index}>{lang.name}, </span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
              {/* details end */}
              <div className={country.borderCountry}>
                <h3 className={country.borderTitle}>Border Countries</h3>
                <div className={country.borderContainer}>
                  {borders.length ? (
                    borders.map((border, index) => {
                      return (
                        <div key={index} className={country.border}>
                          <Link href={`/country/${border.name}`}>
                            {border.name}
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <p>No Country around, probably an Island.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("https://restcountries.eu/rest/v2/region/europe");
  const data = res.data;

  const paths = data.map((country) => ({
    params: { country_name: country.name },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let data;
  const { country_name } = params;
  const res = await axios.get(
    `https://restcountries.eu/rest/v2/name/${encodeURIComponent(country_name)}`
  );
  data = res.data[0];
  const { borders } = data;
  if (borders.length > 0) {
    const fetchCountries = await axios.get(
      `https://restcountries.eu/rest/v2/alpha?codes=${borders.join(";")}`
    );
    data.borders = fetchCountries.data;
  } else {
    data.borders = [];
  }

  return {
    props: {
      data,
    },
  };
}
