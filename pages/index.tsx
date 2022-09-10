import styles from "./Home.module.scss";
import Search from "../components/Home/Search";
import HomeContent from "../components/Home/HomeContent";
import fetchCountriesData from "../data/fetchCountriesData";
import { countriesDataType } from "../utilits/types";
import Head from "next/head";

interface props {
  HomeCountriesData: countriesDataType[];
}
function Home(props: props) {
  const { HomeCountriesData } = props;

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
      <HomeContent HomeCountriesData={HomeCountriesData} />
    </div>
  );
}

export async function getStaticProps() {
  const data = (await fetchCountriesData()) || [];

  return {
    props: {
      HomeCountriesData: data.data.slice(0, 12),
    },
  };
}

export default Home;
