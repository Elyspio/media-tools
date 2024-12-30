import { createActionGenerator } from "../../utils/utils.actions";
import { GetWeatherResult, WeatherCityName } from "@apis/rest/backend/generated";

const createAction = createActionGenerator("torrent");

export const setWeather = createAction<{ city: WeatherCityName; data: GetWeatherResult }>("set");
