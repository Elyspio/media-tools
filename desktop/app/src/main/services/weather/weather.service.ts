import { inject, injectable } from "inversify";
import { WeatherApi } from "@apis/rest/backend/clients";
import { WeatherCityName } from "@apis/rest/backend/generated";

@injectable()
export class WeatherService {
	@inject(WeatherApi)
	private weatherApi!: WeatherApi;

	public async getWeather(city: WeatherCityName) {
		const client = await this.weatherApi.getClient();
		return client.getWeather(city);
	}

	public async getCities() {
		const client = await this.weatherApi.getClient();
		return client.getWeatherCities();
	}
}
