import axios from "axios";

async function fetchChosenCountryData(name: string) {
  const data = await axios.get(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );

  return data;
}

export default fetchChosenCountryData;
