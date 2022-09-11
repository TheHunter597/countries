import styles from "./GameMain.module.scss";
import countrtBorderImage from "../../public/images/borderCountries.png";
import Image from "next/image";
import { useContext } from "react";
import context from "../../context/context";
import { contextType } from "../../utilits/types";

interface props {
  startGame: () => void;
  timeToStart: number;
}

function GameMain(props: props) {
  const contextState = useContext(context);
  const { state, dispatch, resetGame } = contextState as contextType;
  const { startGame, timeToStart } = props;
  return (
    <section className={styles.GameMain}>
      <h3 className={styles.GameMain__title}>What is the game</h3>
      <p className={styles.GameMain__info1}>
        The game will start you at a random country from a random region and you
        have to navigate to another specific country at fast as possible .
      </p>
      <p className={styles.GameMain__info2}>
        You can navigate between countries via the border countries in the lower
        part of the page
      </p>
      <div></div>
      <div className={styles.GameMain__image}>
        {!state.game.isActive ? (
          <Image
            src={countrtBorderImage}
            width={900}
            height={450}
            alt="clarification Image"
          />
        ) : (
          <>
            <div>
              <Image
                src={state.game.startCountry.flags.png}
                width={250}
                height={150}
                alt="flag"
              />
              <h4>{state.game.startCountry.name.common}</h4>
            </div>
            <span>&rarr;</span>
            <div>
              <Image
                src={state.game.targetCountry.flags.png}
                width={250}
                height={150}
                alt="flag"
              />
              <h4>{state.game.targetCountry.name.common}</h4>
            </div>
          </>
        )}
      </div>
      {state.game.isActive ? (
        <p className={styles.GameMain__details}>
          you should get from {state.game.startCountry.name.common} to{" "}
          {state.game.targetCountry.name.common}
        </p>
      ) : (
        ""
      )}
      <div className={styles.GameMain__confirm}>
        {!state.game.isActive ? (
          <button onClick={startGame}>Lets do it</button>
        ) : (
          <button className={styles.GameMain__countDown}>{timeToStart}</button>
        )}
      </div>
    </section>
  );
}

export default GameMain;
