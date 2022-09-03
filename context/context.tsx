import { stat } from "fs";
import { useRouter } from "next/router";
import { createContext, useReducer } from "react";

import {
  state,
  action,
  actionTypes,
  countriesDataType,
} from "../utilits/types";

interface props {
  children: JSX.Element;
}

const context = createContext({});

function reducer(state: state, action: action): state {
  const { type, value } = action;
  switch (type) {
    case actionTypes.CHANGE_CURRENT_COUNTRY:
      return { ...state, currentCountry: [value] };
    case actionTypes.CHANGE_COUNTRIES_BY_REGION:
      return { ...state, countriesByRegion: value };
    case actionTypes.CHANGE_CURRENT_CHOSEN_REGION:
      return { ...state, currentChosenRegion: value };
    case actionTypes.CHANGE_ACTIVE_GAME:
      return { ...state, game: { ...state.game, isActive: value } };
    case actionTypes.CHANGE_GAME_REGION_COUNTRIES:
      return {
        ...state,
        game: { ...state.game, chosenRegionCountries: value },
      };
    case actionTypes.CHANGE_START_COUNTRY:
      return { ...state, game: { ...state.game, startCountry: value } };
    case actionTypes.CHANGE_TARGET_COUNTRY:
      return { ...state, game: { ...state.game, targetCountry: value } };
    case actionTypes.CHANGE_DONE_SUCCESSFULLY:
      return { ...state, game: { ...state.game, Sucess: value } };
    case actionTypes.CHANGE_TIME_TAKEN:
      return {
        ...state,
        game: { ...state.game, timeTaken: state.game.timeTaken + 1 },
      };
    case actionTypes.REST_TIME_TAKEN:
      return { ...state, game: { ...state.game, timeTaken: 0 } };
    default:
      return state;
  }
}

export function ContextProvider(props: props) {
  const initialState: state = {
    countriesByRegion: [],
    currentCountry: [],
    currentChosenRegion: "",
    regions: ["Africa", "America", "Asia", "Europe", "Oceania"],
    game: {
      isActive: false,
      chosenRegionCountries: [],
      startCountry: {} as countriesDataType,
      targetCountry: {} as countriesDataType,
      timeTaken: 0,
      Sucess: false,
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const router = useRouter();
  function changeCurrentCountry(country: countriesDataType) {
    router.push(`/${country.name.common.toLocaleLowerCase()}`);
    dispatch({
      type: actionTypes.CHANGE_CURRENT_COUNTRY,
      value: country,
    });
  }

  function resetGame() {
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
    dispatch({ type: actionTypes.CHANGE_ACTIVE_GAME, value: false });
  }

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        changeCurrentCountry,
        resetGame,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export default context;
