import styles from "./Search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import downArrow from "../../public/images/down-arrow.svg";
import { useContext, useRef, useState } from "react";
import fetchInputCountriesData from "../../data/fetchInputCountriesData";
import debounce from "../../utilits/debounce";
import {
  countriesDataType,
  contextType,
  actionTypes,
} from "../../utilits/types";
import { useRouter } from "next/router";
import context from "../../context/context";
import fetchCountriesByRegion from "../../data/fetchCountriesByRegion";

function Search() {
  const [showOptions, setShowOptions] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [countriesData, setCountriesData] = useState<countriesDataType[]>([]);
  const router = useRouter();
  const stateData = useContext(context);
  const { state, dispatch, changeCurrentCountry } = stateData as contextType;
  async function SearchByName() {
    if (input.current != null && input.current.value.length >= 1) {
      const data: any = await fetchInputCountriesData(input.current!.value);
      setCountriesData(data.data);
      return;
    }
    setCountriesData([]);
    return;
  }
  async function getCountriesByRegion(region: string) {
    const data = await fetchCountriesByRegion(region);
    dispatch({
      type: actionTypes.CHANGE_COUNTRIES_BY_REGION,
      value: data.data,
    });
    dispatch({ type: actionTypes.CHANGE_CURRENT_CHOSEN_REGION, value: region });
  }

  const dropdownElements = countriesData.slice(0, 15).map((country) => {
    return (
      <div
        key={country.population}
        onClick={() => {
          changeCurrentCountry(country);
          router.push(`/${country.name.common.toLocaleLowerCase()}`);
        }}
      >
        <Image
          src={country.flags.png}
          width={60}
          height={40}
          alt={`${country.name.common} flag`}
          key={country.population}
          onClick={() => {
            changeCurrentCountry(country);
            router.push(`/${country.name.common.toLocaleLowerCase()}`);
          }}
        />
        <h4>{country.name.common}</h4>
      </div>
    );
  });
  return (
    <div className={styles.Search}>
      <div
        className={styles.Search__input}
        onClick={() => {
          input.current?.focus();
        }}
      >
        <span>
          <AiOutlineSearch />
        </span>
        <input
          aria-label="Search"
          placeholder="Search for a country"
          ref={input}
          onChange={debounce(SearchByName, 500)}
        ></input>
        {countriesData.length >= 1 ? (
          <div className={styles.Search__results}>
            {countriesData.length == 1 &&
            input.current &&
            input.current.value.length > 2 ? (
              dropdownElements
            ) : (
              <div>No result found</div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.Search__game} onClick={() => router.push("/game")}>
        <h2>Play a Game</h2>
      </div>
      <div
        className={styles.Search__select}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <span>
          {state.currentChosenRegion && state.currentChosenRegion.length >= 3
            ? state.currentChosenRegion
            : "Filter by Region"}
        </span>
        <span>
          <Image
            src={downArrow}
            alt="logo"
            height={12}
            width={10}
            loading="eager"
          />
        </span>
        {showOptions ? (
          <div className={styles.Search__options} id="regions" role="menu">
            {state.regions.map((region) => {
              return (
                <span
                  key={region}
                  onClick={() => getCountriesByRegion(region)}
                  role="menuitem"
                >
                  {region}
                </span>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
