import styles from "./GameSucess.module.scss";

import { useContext } from "react";
import context from "../../context/context";
import { contextType } from "../../utilits/types";

function GameSucess() {
  const contextState = useContext(context);
  const { state, resetGame } = contextState as contextType;
  return (
    <section className={styles.GameSucess}>
      <h2>
        Congratulation you have done it
        <br />
        <br />
        The Chanllenge took you :&nbsp;
        <span>{state.game.timeTaken} seconds</span>
        <br />
        <br />
        You Went throught : &nbsp;
        <span>
          {state.game.countriesUserWentThrought.length - 1}&nbsp; Countries
        </span>
        <br />
        <br />
        your path <br />
        {state.game.countriesUserWentThrought.slice(1).map((country) => {
          return <span key={country}>{country}&rarr; </span>;
        })}
        <span>{state.game.targetCountry.name.common}</span>
      </h2>
      <div>
        <button
          onClick={() => {
            resetGame();
          }}
        >
          Retry
        </button>
      </div>
    </section>
  );
}

export default GameSucess;
