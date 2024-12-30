using Elytools.Api.Abstractions.Transports.Weathers;
using Elytools.Api.Abstractions.Transports.Weathers.Results;

namespace Elytools.Api.Abstractions.Interfaces.Adapters;

public interface IWeatherAdapter
{
	Task<GetWeatherResult> GetWeather(WeatherCity city);
}