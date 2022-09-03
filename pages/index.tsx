import styles from "./Home.module.scss";
import Search from "../components/Home/Search";
import HomeContent from "../components/Home/HomeContent";
import fetchCountriesData from "../data/fetchCountriesData";
import { countriesDataType } from "../utilits/types";
import Head from "next/head";

interface props {
  allCountriesData: countriesDataType[];
}
function Home(props: props) {
  const { allCountriesData } = props;

  return (
    <div className={styles.Home}>
      <Head>
        <title>Where in the world</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Search />
      <HomeContent allCountriesData={allCountriesData} />
    </div>
  );
}

export async function getStaticProps() {
  const data = (await fetchCountriesData()) || [];

  return {
    props: {
      allCountriesData: data.data,
    },
  };
}

export default Home;
