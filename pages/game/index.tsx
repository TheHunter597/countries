import styles from "./Game.module.scss";
import { useContext, useState } from "react";
import context from "../../context/context";
import {
  contextType,
  actionTypes,
  countriesDataType,
} from "../../utilits/types";
import { useRouter } from "next/router";
import fetchCountriesByRegion from "../../data/fetchCountriesByRegion";
import randomInteger from "random-int";
import Head from "next/head";
import GameMain from "../../components/Game/GameMain";
import GameSucess from "../../components/Game/GameSucess";
function Game() {
  const contextState = useContext(context);
  const { state, dispatch } = contextState as contextType;
  const router = useRouter();
  const [timeToStart, setTimeToStart] = useState(10);
  async function startGame() {
    const gameRegion: { data: countriesDataType[] } =
      await fetchCountriesByRegion(state.regions[randomInteger(0, 3)]);
    const { data } = gameRegion;
    let startRandomIntger = randomInteger(0, data.length);
    let targetRandomInteger = randomInteger(0, data.length);
    let startCountry: countriesDataType = data[startRandomIntger];
    let targetCountry: countriesDataType = data[targetRandomInteger];
    while (
      !startCountry ||
      !startCountry.borders ||
      startCountry.borders.length < 2 ||
      !startCountry.name.common
    ) {
      startCountry = data[Math.floor(Math.random() * data.length)];
    }
    while (
      !targetCountry ||
      !targetCountry.borders ||
      targetCountry.borders.length < 2 ||
      !startCountry.name.common ||
      startCountry.name.common === targetCountry.name.common
    ) {
      targetCountry = data[Math.floor(Math.random() * data.length)];
    }
    dispatch({ type: actionTypes.CHANGE_ACTIVE_GAME, value: true });
    dispatch({ type: actionTypes.REST_COUNTRIES_USER_WENT_THROUGHT });
    setTimeToStart(10);
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
    dispatch({ type: actionTypes.REST_TIME_TAKEN });
    dispatch({ type: actionTypes.CHANGE_DONE_SUCCESSFULLY, value: false });
    let timer: any = setInterval(() => {
      setTimeToStart((prev) => (prev -= 1));
    }, 1000);
    setTimeout(() => {
      router.push(`/${startCountry.name.common.toLocaleLowerCase()}`);
      clearInterval(timer);
    }, timeToStart * 1000);
  }
  return (
    <div className={styles.Game}>
      <Head>
        <title>Play A Game</title>
      </Head>
      <div className={styles.Game__back}>
        <button onClick={() => router.push("/")}>Back</button>
      </div>
      {!state.game.Sucess ? (
        <GameMain startGame={startGame} timeToStart={timeToStart} />
      ) : (
        <GameSucess />
      )}
    </div>
  );
}

export default Game;
