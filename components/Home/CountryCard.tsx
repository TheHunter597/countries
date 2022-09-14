import styles from "./CountryCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

interface props {
  data: {
    name: { common: string };
    population: number;
    region: string;
    capital: string[];
    flags: { png: string };
  };
}

function CountryCard(props: props) {
  const { data } = props;
  const router = useRouter();
  const {
    name: { common },
    population,
    region,
    capital,
    flags: { png },
  } = data;
  return (
    <article
      className={styles.CountryCard}
      onClick={() => router.push(`/${common.toLocaleLowerCase()}`)}
    >
      <Image
        loading="eager"
        src={png}
        width={350}
        height={220}
        alt={`${data.name.common} flag`}
      />
      <div className={styles.CountryCard__info}>
        <h3>{common}</h3>
        <span>
          Poulation: <span>{population.toLocaleString("en-US")}</span>{" "}
        </span>
        <span>
          Region: <span>{region}</span>
        </span>
        <span>
          Capital: <span>{capital}</span>{" "}
        </span>
      </div>
    </article>
  );
}

export default CountryCard;
