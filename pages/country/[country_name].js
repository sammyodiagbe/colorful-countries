import country from "../../styles/Country.module.css";
import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { myLoader } from "../../layouts/loader";
import Link from "next/link";

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
  console.log("borders ", borders);
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Layout>
        <div className={country.container}>
          <div className={country.flagContainer}>
            <Image
              loader={myLoader}
              src={flag}
              alt={`${name}'s flag`}
              width={500}
              height={300}
            />
          </div>
          <div className={country.details}>
            <div className={country.left}>
              <h2>{name}</h2>

              <p>
                Native Name: <span>{nativeName}</span>
              </p>
              <p>
                Population <span>{population}</span>
              </p>
              <p>
                Region: <span>{region}</span>
              </p>
              <p>
                Sub Region: <span>{subregion}</span>
              </p>
              <p>
                Capital: <span>{capital}</span>
              </p>
            </div>
            <div className={country.right}>
              <p>
                Top Level Domain: <span>{topLevelDomain[0]}</span>
              </p>
              <p>
                Native Name: <span>{nativeName}</span>
              </p>
              <p>
                Currencies:{" "}
                <span>
                  {currencies.map((currency, index) => (
                    <span key={index}>{currency.name},</span>
                  ))}
                </span>
              </p>
              <p>
                Languages:{" "}
                <span>
                  {languages.map((lang, index) => (
                    <span key={index}>{lang.name}, </span>
                  ))}
                </span>
              </p>
              <div className={country.borderCountry}>
                <h3>Border Countries</h3>
                {borders.map((border, index) => {
                  return (
                    <Link
                      href={`/country/${border.name}`}
                      key={index}
                      className={country.borderName}
                    >
                      {border}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(
    "https://restcountries.eu/rest/v2/all?fields=name;region;capital;flag;population"
  );
  const data = res.data;

  const paths = data.map((country) => ({
    params: { country_name: country.name },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let data;
  // const { country } = params;
  const res = await axios.get(
    `https://restcountries.eu/rest/v2/name/${params.country_name}`
  );
  data = res.data[0];
  const { borders } = data;
  const fetchCountries = await axios.get(
    `https://restcountries.eu/rest/v2/alpha?codes=${borders.join(
      ";"
    )}&fields=name`
  );
  data.borders = fetchCountries.data;
  return {
    props: {
      data,
    },
  };
}
