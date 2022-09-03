import fetchChosenCountryData from "../../data/fetchChosenCountryData";
import styles from "./CountryDetails.module.scss";
import fetchCountriesData from "../../data/fetchCountriesData";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import {
  countriesDataType,
  contextType,
  actionTypes,
} from "../../utilits/types";
import context from "../../context/context";
import { useRouter } from "next/router";
import fetchCountryByCode from "../../data/fetchCountryByCode";
interface props {
  data: countriesDataType[];
}

function CountryDetails(props: props) {
  const { data } = props;
  const contextState = useContext(context);
  const { dispatch, state } = contextState as contextType;
  const router = useRouter();

  const [borderCountriesData, setBorderCountriesData] = useState<
    countriesDataType[]
  >([]);
  useEffect(() => {
    dispatch({ type: actionTypes.CHANGE_CURRENT_COUNTRY, value: data });
    if (
      state.game.isActive &&
      state.game.targetCountry.name.common === data[0].name.common
    ) {
      dispatch({ type: actionTypes.CHANGE_DONE_SUCCESSFULLY, value: true });
      router.push("/game");
    }
  }, [data, dispatch]);

  const {
    name: { nativeName, common },
    population,
    region,
    subregion,
    tld,
    currencies,
    languages: spa,
    capital,
    flags: { png },
    languages,
    borders,
  } = data[0];
  data[0] === undefined ? console.log("unde") : "here";

  let Allcurrencies: any = currencies ? Object.values(currencies) : "";
  let AllLanguages: any = languages ? Object.values(languages) : "";
  let AllnativeName: any = nativeName ? Object.values(nativeName) : "";

  const borderCountries = borderCountriesData.map((country) => {
    return (
      <span
        key={country.tld}
        onClick={() =>
          router.push(`/${country.name.common.toLocaleLowerCase()}`)
        }
      >
        {country.name.common}
      </span>
    );
  });

  useEffect(() => {
    setBorderCountriesData([]);
    async function getBorderCountries() {
      const data = await fetchCountryByCode(borders.join());

      setBorderCountriesData(data);
    }
    getBorderCountries();
  }, [borders]);

  return (
    <div className={styles.CountryDetails}>
      <div className={styles.CountryDetails__back}>
        <button onClick={() => router.push("/")}>
          <span>&larr;</span>Back
        </button>
      </div>
      {state.game.isActive ? (
        <div className={styles.CountryDetails__gameTarget}>
          <h4>
            target &rarr;
            {state.game.targetCountry.name.common}
          </h4>
        </div>
      ) : (
        " "
      )}
      <h2 className={styles.CountryDetails__title}>{common}</h2>
      <div className={styles.CountryDetails__image}>
        <Image src={png} width={550} height={420} alt="flag" />
      </div>
      <div className={styles.CountryDetails__Info1}>
        <div>
          <h4>Native Name: </h4> <span>{AllnativeName[0].official}</span>
        </div>
        <div>
          <h4>Population: </h4>
          <span> {population.toLocaleString("en-Us")}</span>{" "}
        </div>
        <div>
          <h4>Region: </h4>
          <span>{region}</span>{" "}
        </div>
        <div>
          <h4>Sub Region: </h4>
          <span>{subregion}</span>{" "}
        </div>
        <div>
          <h4>Capital : </h4>
          <span>{capital[0]}</span>
        </div>
      </div>
      <div className={styles.CountryDetails__Info2}>
        <div>
          <h4>Top Level Domian : </h4>
          <span>{tld[0]}</span>{" "}
        </div>
        <div className={styles.CountryDetails__currencies}>
          <h4>Currencies: </h4>
          {Allcurrencies.map((currency: any) => (
            <span key={currency.name}>{currency.name},</span>
          ))}{" "}
        </div>
        <div className={styles.CountryDetails__languages}>
          <h4>Languages: </h4>
          {AllLanguages.map((language: string) => (
            <span key={language}>{language} , </span>
          ))}{" "}
        </div>
      </div>
      <div className={styles.CountryDetails__Info3}>
        <h4>Border Countries: </h4>
        <div className={styles.CountryDetails__border}>{borderCountries}</div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const AllData = (await fetchCountriesData()) || [];
  const countriesWithNoDataBase = [
    "Bouvet island",
    "Antarctica",
    "Macau",
    "Heard Island and McDonald Islands",
    "kosovo",
    "Réunion",
    "Curaçao",
    "São Tomé and Príncipe",
    "Åland Islands",
    "saint barthélemy",
  ];

  const paths = AllData.data.map((country) => {
    if (
      countriesWithNoDataBase.some(
        (name) =>
          name.toLocaleLowerCase() === country.name.common.toLocaleLowerCase()
      )
    ) {
      return;
    }
    return {
      params: {
        countryName: country.name.common.toLocaleLowerCase(),
      },
    };
  });

  return {
    fallback: false,
    paths: paths,
  };
}

export async function getStaticProps(context: {
  params: { countryName: string };
}) {
  const data = await fetchChosenCountryData(
    context.params.countryName.toLocaleLowerCase()
  );
  return {
    props: {
      data: data.data,
    },
  };
}

export default CountryDetails;
