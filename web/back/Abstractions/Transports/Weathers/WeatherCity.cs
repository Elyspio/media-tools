namespace Elytools.Api.Abstractions.Transports.Weathers;

/// <summary>
/// Represents a city for which with its coordinates
/// </summary>
public sealed class WeatherCity
{
	public static readonly WeatherCity Caluire = new(WeatherCityName.Caluire, 45.7968, 4.8424);
	public static readonly WeatherCity SaintDidier = new(WeatherCityName.SaintDidier, 45.8125, 4.7983);


	public static WeatherCity FromName(WeatherCityName name)
	{
		return name switch
		{
			WeatherCityName.Caluire => Caluire,
			WeatherCityName.SaintDidier => SaintDidier,
			_ => throw new ArgumentOutOfRangeException(nameof(name), name, null)
		};
	}
	
	/// <summary>
	/// Represents a city for which with its coordinates
	/// </summary>
	/// <param name="name"></param>
	/// <param name="lat">Latitude</param>
	/// <param name="l">Longitude</param>
	private WeatherCity(WeatherCityName name, double lat, double l)
	{
		Name = name;
		Lat = lat;
		Long = l;
	}

	/// <summary></summary>
	public WeatherCityName Name { get; init; }

	/// <summary>Latitude</summary>
	public double Lat { get; }

	/// <summary>Longitude</summary>
	public double Long { get; }


}