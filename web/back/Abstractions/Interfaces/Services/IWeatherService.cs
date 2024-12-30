using Elytools.Api.Abstractions.Transports.Weathers;
using Elytools.Api.Abstractions.Transports.Weathers.Results;

namespace Elytools.Api.Abstractions.Interfaces.Services;

public interface IWeatherService
{
	public Task<IReadOnlyCollection<WeatherCityName>> GetWeatherCities();
	public Task<GetWeatherResult> GetWeather(WeatherCityName city);
	public Task RefreshCache();
}