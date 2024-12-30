using Elyspio.Utils.Telemetry.Technical.Helpers;
using Elyspio.Utils.Telemetry.Tracing.Elements;
using Elytools.Api.Abstractions.Interfaces.Services;
using Elytools.Api.Abstractions.Transports.Weathers;
using Elytools.Api.Abstractions.Transports.Weathers.Results;
using Microsoft.AspNetCore.Mvc;

namespace Elytools.Api.Web.Controllers;

[ApiController]
[Route("/weathers")]
public class WeatherController: TracingController
{

	private readonly IWeatherService _weatherService;

	public WeatherController(ILogger<WeatherController> logger, IWeatherService weatherService) : base(logger)
	{
		_weatherService = weatherService;
	}

	[HttpGet("cities")]
	public  Task<IReadOnlyCollection<WeatherCityName>> GetWeatherCities()
	{
		using var _ = LogController();

		return _weatherService.GetWeatherCities();
	}

	[HttpGet("cities/{city}")]
	public async Task<GetWeatherResult> GetWeather(WeatherCityName city)
	{
		using var _ = LogController(Log.F(city));

		return await _weatherService.GetWeather(city);
	}
}