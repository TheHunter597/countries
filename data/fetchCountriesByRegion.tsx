import axios from "axios";

function fetchCountriesByRegion(region: string) {
  const data = axios.get(`https://restcountries.com/v3.1/region/${region}`);
  return data;
}

export default fetchCountriesByRegion;
