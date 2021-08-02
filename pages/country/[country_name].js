import country from "../../styles/Country.module.css";
import { useRouter } from "next/router";
import Layout from "../../layouts/Layout";
import axios from "axios";
import Head from "next/head";

export default function Country({ data }) {
  console.log(data);
  const router = useRouter();
  const { country_name } = router.query;
  return (
    <>
      <Head>
        <title>{country_name}</title>
      </Head>
      <Layout>
        <div className={country.container}></div>
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
    `https://restcountries.eu/rest/v2/name/${params.country_name}?fields=nativeName;region;subRegion;capital;topLevelDomain;languages;borders`
  );
  data = res.data[0];
  console.log(data);
  const { borders } = data;
  const fetchCountries = await axios.get(
    `https://restcountries.eu/rest/v2/alpha?codes=${borders.join(
      ";"
    )}&fields=name`
  );
  data.borders = fetchCountries.data;
  console.log(data);
  return {
    props: {
      data,
    },
  };
}
