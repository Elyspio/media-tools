import { createAsyncActionGenerator, getService } from "../../utils/utils.actions";
import { WeatherService } from "@services/weather/weather.service";
import { WeatherCityName } from "@apis/rest/backend/generated";
import { setWeather } from "@modules/weather/weather.action";

const createAsyncThunk = createAsyncActionGenerator("weather");

export const getWeatherCities = createAsyncThunk("get-cities", async (_, { extra }) => {
	const service = getService(WeatherService, extra);
	return service.getCities();
});

export const getWeather = createAsyncThunk("get-weather", async (city: WeatherCityName, { extra, dispatch }) => {
	const service = getService(WeatherService, extra);
	const weather = await service.getWeather(city);

	dispatch(setWeather({ city, data: weather }));
});
