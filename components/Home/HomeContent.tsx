import styles from "./HomeContent.module.scss";
import CountryCard from "./CountryCard";
import {
  countriesDataType,
  contextType,
  actionTypes,
} from "../../utilits/types";
import context from "../../context/context";
import { useContext, useEffect, useMemo } from "react";

interface props {
  allCountriesData: countriesDataType[];
}
function HomeContent(props: props) {
  const contextState = useContext(context);
  const { state, dispatch } = contextState as contextType;
  const { allCountriesData } = props;
  let CountriesDisplayedAtHomePage =
    state.countriesByRegion.length > 2
      ? state.countriesByRegion
      : allCountriesData;
  let numOfCountriesToDisplay = state.countriesByRegion.length > 2 ? 60 : 8;
  const result = useMemo(
    () =>
      CountriesDisplayedAtHomePage?.slice(0, numOfCountriesToDisplay).map(
        (country) => {
          return <CountryCard data={country} key={country.name.common} />;
        }
      ),
    [CountriesDisplayedAtHomePage, numOfCountriesToDisplay]
  );
  return <div className={styles.HomeContent}>{result}</div>;
}

export default HomeContent;
