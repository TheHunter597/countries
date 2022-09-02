import axios from "axios";
import { countriesDataType } from "../utilits/types";

async function fetchCountriesData() {
  const data: { data: countriesDataType[] } = await axios.get(
    "https://restcountries.com/v3.1/all"
  );
  return data;
}

export default fetchCountriesData;
