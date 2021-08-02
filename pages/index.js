import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FaSearch } from "react-icons/fa";
import Nav from "../layouts/nav";
import { ThemeContext } from "../context/context";
import { useState } from "react";
import axios from "axios";
import Country from "../layouts/country";
import Layout from "../layouts/Layout";

export default function Home({ country_data }) {
  const renderCountries = country_data.map((country, index) => {
    return <Country key={index} data={country} />;
  });
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Colorful Countries</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="author" content="Odiagbe Samson Osaro" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.inputAndFilterContainer}>
          <div className={styles.inputContainer}>
            <FaSearch className={styles.buttonIcon} />
            <input type="text" placeholder="Search for a country" />
          </div>

          {/* build custom select */}
          <div className={styles.filter}>
            <select defaultValue={"Filter by Region"}>
              <option disabled>Filter by Region</option>
              <option>Africa</option>
              <option>America</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>
          </div>
        </div>
        <div className={styles.countriesContainer}>{renderCountries}</div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  let country_data;
  try {
    let res = await axios.get(
      "https://restcountries.eu/rest/v2/all?fields=name;region;capital;flag;population"
    );
    country_data = res.data;
  } catch (err) {
    console.log("something broke, ", err);
  }

  return {
    props: { country_data },
  };
}
