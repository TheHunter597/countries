import axios from "axios";

async function fetchInputCountriesData(name: string) {
  const data =
    (await axios.get(`https://restcountries.com/v3.1/name/${name}`)) || [];

  return data;
}

export default fetchInputCountriesData;
