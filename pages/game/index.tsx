import styles from "./Game.module.scss";
import countrtBorderImage from "../../public/images/borderCountries.png";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import context from "../../context/context";
import {
  contextType,
  actionTypes,
  countriesDataType,
} from "../../utilits/types";
import { useRouter } from "next/router";
import fetchCountriesByRegion from "../../data/fetchCountriesByRegion";
import randomInteger from "random-int";
import { stat } from "fs";
function Game() {
  const contextState = useContext(context);
  const { state, dispatch } = contextState as contextType;
  const router = useRouter();
  const [timeToStart, setTimeToStart] = useState(15);
  async function startGame() {
    const gameRegion: { data: countriesDataType[] } =
      await fetchCountriesByRegion(state.regions[randomInteger(0, 3)]);
    const { data } = gameRegion;
    const startCountry: countriesDataType = data[randomInteger(0, data.length)];
    const targetCountry: countriesDataType =
      data[randomInteger(0, data.length)];
    dispatch({ type: actionTypes.CHANGE_ACTIVE_GAME, value: true });
    dispatch({
      type: actionTypes.CHANGE_GAME_REGION_COUNTRIES,
      value: data,
    });
    dispatch({
      type: actionTypes.CHANGE_START_COUNTRY,
      value: startCountry,
    });
    dispatch({
      type: actionTypes.CHANGE_TARGET_COUNTRY,
      value: targetCountry,
    });
    dispatch({ type: actionTypes.CHANGE_DONE_SUCCESSFULLY, value: false });
    let timer: any = setInterval(() => {
      setTimeToStart((prev) => (prev -= 1));
    }, 1000);
    setTimeout(() => {
      router.push(`/${startCountry.name.common.toLocaleLowerCase()}`);
      clearInterval(timer);
    }, 15000);
  }
  async function resetGame() {
    dispatch({
      type: actionTypes.CHANGE_GAME_REGION_COUNTRIES,
      value: [],
    });
    dispatch({
      type: actionTypes.CHANGE_START_COUNTRY,
      value: {},
    });
    dispatch({
      type: actionTypes.CHANGE_TARGET_COUNTRY,
      value: {},
    });
    dispatch({ type: actionTypes.CHANGE_DONE_SUCCESSFULLY, value: false });
    dispatch({ type: actionTypes.REST_TIME_TAKEN });
    setTimeToStart(15);
    dispatch({ type: actionTypes.CHANGE_ACTIVE_GAME, value: false });
  }

  return (
    <div className={styles.Game}>
      {!state.game.Sucess ? (
        <>
          <h3 className={styles.Game__title}>What is the game</h3>
          <p className={styles.Game__info1}>
            The game will start you at a random country from a random region and
            you have to navigate to another specific country at fast as possible
            .
          </p>
          <p className={styles.Game__info2}>
            You can navigate between countries via the border countries in the
            lower part of the page
          </p>
          <div></div>
          <div className={styles.Game__image}>
            {!state.game.isActive ? (
              <Image
                src={countrtBorderImage}
                width={1000}
                height={550}
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
            <p className={styles.Game__details}>
              you should get from {state.game.startCountry.name.common} to{" "}
              {state.game.targetCountry.name.common}
            </p>
          ) : (
            ""
          )}
          <div className={styles.Game__confirm}>
            {!state.game.isActive ? (
              <button onClick={startGame}>Lets do it</button>
            ) : (
              <button className={styles.Game__countDown}>{timeToStart}</button>
            )}
          </div>
        </>
      ) : (
        <div className={styles.Game__sucess}>
          <h2>Congratulation you have done it</h2>
          <div>
            <button onClick={resetGame}>Retry</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
