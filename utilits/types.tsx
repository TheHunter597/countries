export interface countriesDataType {
  name: { common: string; nativeName: { eng: { common: string } } };
  population: number;
  region: string;
  capital: string[];
  flags: { png: string };
  subregion: string;
  tld: string;
  currencies: {};
  languages: {};
  borders: string[];
}

export interface state {
  countriesByRegion: countriesDataType[];
  currentCountry: countriesDataType[];
  currentChosenRegion: string;
  regions: ["Africa", "America", "Asia", "Europe", "Oceania"];
  game: {
    isActive: boolean;
    chosenRegionCountries: countriesDataType[];
    startCountry: countriesDataType;
    targetCountry: countriesDataType;
    timeTaken: number;
    countriesUserWentThrought: string[];
    Sucess: boolean;
  };
}

export enum actionTypes {
  CHANGE_CURRENT_COUNTRY = "CHANGE_CURRENT_COUNTRY",
  CHANGE_COUNTRIES_BY_REGION = "CHANGE_COUNTRIES_BY_REGION",
  CHANGE_CURRENT_CHOSEN_REGION = "CHANGE_CURRENT_CHOSEN_REGION",
  CHANGE_ACTIVE_GAME = "CHANGE_ACTIVE_GAME",
  CHANGE_GAME_REGION_COUNTRIES = "CHNAGE_GAME_REGION_COUNTRIES",
  CHANGE_START_COUNTRY = "CHANGE_START_COUNTRY",
  CHANGE_TARGET_COUNTRY = "CHANGE_TARGET_COUNTRY",
  CHANGE_DONE_SUCCESSFULLY = "CHANGE_DONE_SUCCESSFULLY",
  CHANGE_TIME_TAKEN = "CHANGE_TIME_TAKEN",
  CHANGE_COUNTRIES_USER_WENT_THROUGHT = "CHANGE_COUNTRIES_USER_WENT_THROUGHT",
  REST_COUNTRIES_USER_WENT_THROUGHT = "REST_COUNTRIES_USER_WENT_THROUGHT",
  REST_TIME_TAKEN = "REST_TIME_TAKEN",
}

export interface action {
  type: actionTypes;
  value?: any;
}

export interface contextType {
  state: state;
  dispatch: ({ type, value }: { type: actionTypes; value?: any }) => void;
  changeCurrentCountry: (country: countriesDataType) => void;
  controlTimeTakenCounting: () => void;
  resetGame: () => void;
}
