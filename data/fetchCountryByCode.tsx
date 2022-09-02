import axios from "axios";
import { countriesDataType } from "../utilits/types";
interface data {
  data: countriesDataType[];
}
async function fetchCountryByCode(code: string) {
  const data: data = await axios.get(
    `https://restcountries.com/v3.1/alpha/${code}`
  );
  return data.data;
}

export default fetchCountryByCode;
