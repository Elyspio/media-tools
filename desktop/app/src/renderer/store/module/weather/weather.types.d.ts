import { GetWeatherResult, WeatherCityName } from "@apis/rest/backend/generated";
import { PartialRecord } from "@store/utils/utils.types";

export interface WeatherState {
	cities: WeatherCityName[];
	weather: PartialRecord<WeatherCityName, GetWeatherResult>;
}
