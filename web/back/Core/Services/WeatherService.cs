using Elyspio.Utils.Telemetry.Technical.Helpers;
using Elyspio.Utils.Telemetry.Tracing.Elements;
using Elytools.Api.Abstractions.Interfaces.Adapters;
using Elytools.Api.Abstractions.Interfaces.Services;
using Elytools.Api.Abstractions.Transports.Weathers;
using Elytools.Api.Abstractions.Transports.Weathers.Results;
using Microsoft.Extensions.Caching.Hybrid;
using Microsoft.Extensions.Logging;

namespace Elytools.Api.Core.Services;

public class WeatherService : TracingService, IWeatherService
{
	private readonly IWeatherAdapter _weatherAdapter;
	private readonly HybridCache _hybridCache;


	public WeatherService(ILogger<WeatherService> logger, IWeatherAdapter weatherAdapter, HybridCache hybridCache) : base(logger)
	{
		_weatherAdapter = weatherAdapter;
		_hybridCache = hybridCache;
	}

	public Task<IReadOnlyCollection<WeatherCityName>> GetWeatherCities()
	{
		using var _ = LogService();

		return Task.FromResult<IReadOnlyCollection<WeatherCityName>>([
			WeatherCityName.Caluire,
			WeatherCityName.SaintDidier
		]);
	}

	public async Task<GetWeatherResult> GetWeather(WeatherCityName city)
	{
		using var _ = LogService(Log.F(city));

		var cacheKey = GetCacheKey(city);

		return await _hybridCache.GetOrCreateAsync<GetWeatherResult>(
			cacheKey,
			async (_) => await _weatherAdapter.GetWeather(WeatherCity.FromName(city)),
			new HybridCacheEntryOptions()
			{
				Expiration = TimeSpan.FromHours(1)
			},
			tags: [cacheKey]
		);
	}

	public async Task RefreshCache()
	{
		using var logger = LogService();

		var cities = await GetWeatherCities();

		await _hybridCache.RemoveByTagAsync(cities.Select(GetCacheKey));

		_ = await Task.WhenAll(cities.Select(GetWeather));
	}


	private string GetCacheKey(WeatherCityName city) => $"elytools:weather:{city}";

	private WeatherCity GetWeatherCity(WeatherCityName city) => city switch
	{
		WeatherCityName.Caluire => WeatherCity.Caluire,
		WeatherCityName.SaintDidier => WeatherCity.SaintDidier,
		_ => throw new ArgumentOutOfRangeException(nameof(city), city, null)
	};
}