using Elytools.Api.Abstractions.Transports.Weathers.Reponses;

namespace Elytools.Api.Abstractions.Transports.Weathers.Results;

public class GetWeatherResult
{
	public required Forecast Current { get; set; }

	public required Forecast[] Hourly { get; set; }

}

/// <summary>
/// Données météo
/// </summary>
/// <param name="Date"></param>
/// <param name="Temperature"></param>
/// <param name="Type"></param>
/// <param name="Rain"></param>
public sealed record Forecast(DateTime Date, Temperature Temperature, WeatherType Type, double? Rain);

public sealed record Temperature(double Current, double FeelsLike);