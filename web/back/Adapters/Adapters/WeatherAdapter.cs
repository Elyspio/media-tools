using System.Text.Json;
using Elyspio.Utils.Telemetry.Tracing.Elements;
using Elytools.Api.Abstractions.Exceptions;
using Elytools.Api.Abstractions.Interfaces.Adapters;
using Elytools.Api.Abstractions.Transports.Weathers;
using Elytools.Api.Abstractions.Transports.Weathers.Reponses;
using Elytools.Api.Abstractions.Transports.Weathers.Results;
using Elytools.Api.Adapters.OpenWeatherMap.Assemblers;
using Microsoft.Extensions.Logging;

namespace Elytools.Api.Adapters.OpenWeatherMap.Adapters;




public sealed class WeatherAdapter : TracingAdapter, IWeatherAdapter
{
	private readonly IHttpClientFactory _httpClientFactory;

	public const string ClientName = nameof(WeatherAdapter);


	private readonly GetWeatherAssembler _weatherAssembler;


	public WeatherAdapter(IHttpClientFactory httpClientFactory, ILogger<WeatherAdapter> logger, GetWeatherAssembler weatherAssembler): base(logger)
	{
		_httpClientFactory = httpClientFactory;
		_weatherAssembler = weatherAssembler;
	}

	public async Task<GetWeatherResult> GetWeather(WeatherCity city)
	{
		using var logger = LogAdapter();

		using var client = _httpClientFactory.CreateClient(ClientName);

		var response =  await client.GetAsync($"https://api.openweathermap.org/data/3.0/onecall?lat={city.Lat}&lon={city.Long}");

		if (!response.IsSuccessStatusCode)
		{
			var message = $"Error while getting weather for {city.Name} : {await response.Content.ReadAsStringAsync()}";
			logger.Error(message);
			throw new HttpException(message);
		}

		await using var stream = await response.Content.ReadAsStreamAsync();

		var weather =  await JsonSerializer.DeserializeAsync<GetWeatherResponse>(stream, GetWeatherResponse.ConverterOptions);

		return _weatherAssembler.Convert(weather!);

	}
}