import { inject, injectable } from "inversify";
import { ConfigurationService } from "@services/configuration/configuration.service";
import { WeatherClient } from "@apis/rest/backend/generated";
import axios from "axios";

const axiosInstance = axios.create({
	transformResponse: [],
});

@injectable()
export class WeatherApi {
	constructor(@inject(ConfigurationService) private readonly configurationService: ConfigurationService) {}

	public async getClient() {
		const config = await this.configurationService.get();
		return new WeatherClient(config.endpoints.api, axiosInstance);
	}
}
