import styles from "./Home.module.scss";
import Search from "../components/Home/Search";
import HomeContent from "../components/Home/HomeContent";
import fetchCountriesData from "../data/fetchCountriesData";
import { countriesDataType } from "../utilits/types";

interface props {
  allCountriesData: countriesDataType[];
}
function Home(props: props) {
  const { allCountriesData } = props;

  return (
    <div className={styles.Home}>
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
