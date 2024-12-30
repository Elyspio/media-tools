using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Elytools.Api.Abstractions.Transports.Weathers.Reponses;

public sealed class GetWeatherResponse
{
	[JsonPropertyName("lat")] public double Lat { get; set; }

	[JsonPropertyName("lon")] public double Lon { get; set; }

	[JsonPropertyName("timezone")] public required string Timezone { get; set; }

	[JsonPropertyName("timezone_offset")] public long TimezoneOffset { get; set; }

	[JsonPropertyName("current")] public required Current Current { get; set; }

	[JsonPropertyName("minutely")] public required Minutely[] Minutely { get; set; }

	[JsonPropertyName("hourly")] public required Current[] Hourly { get; set; }

	[JsonPropertyName("daily")] public required Daily[] Daily { get; set; }

	[JsonPropertyName("alerts")] public required Alert[] Alerts { get; set; }

	public static readonly JsonSerializerOptions ConverterOptions = new(JsonSerializerDefaults.General)
	{
		Converters =
		{
			MainConverter.Singleton,
			new DateOnlyConverter(),
			new TimeOnlyConverter(),
			IsoDateTimeOffsetConverter.Singleton
		},
	};
}

public sealed class Alert
{
	[JsonPropertyName("sender_name")] public required string SenderName { get; set; }

	[JsonPropertyName("event")] public required string Event { get; set; }

	[JsonPropertyName("start")] public long Start { get; set; }

	[JsonPropertyName("end")] public long End { get; set; }

	[JsonPropertyName("description")] public required string Description { get; set; }

	[JsonPropertyName("tags")] public required string[] Tags { get; set; }
}

public sealed class Current
{
	[JsonPropertyName("dt")] public long Dt { get; set; }

	[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
	[JsonPropertyName("sunrise")]
	public long? Sunrise { get; set; }

	[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
	[JsonPropertyName("sunset")]
	public long? Sunset { get; set; }

	[JsonPropertyName("temp")] public double Temp { get; set; }

	[JsonPropertyName("feels_like")] public double FeelsLike { get; set; }

	[JsonPropertyName("pressure")] public double Pressure { get; set; }

	[JsonPropertyName("humidity")] public double Humidity { get; set; }

	[JsonPropertyName("dew_point")] public double DewPoint { get; set; }

	[JsonPropertyName("uvi")] public double Uvi { get; set; }

	[JsonPropertyName("clouds")] public double Clouds { get; set; }

	[JsonPropertyName("visibility")] public double Visibility { get; set; }

	[JsonPropertyName("wind_speed")] public double WindSpeed { get; set; }

	[JsonPropertyName("wind_deg")] public long WindDeg { get; set; }

	[JsonPropertyName("wind_gust")] public double WindGust { get; set; }

	[JsonPropertyName("weather")] public required Weather[] Weather { get; set; }

	[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
	[JsonPropertyName("pop")]
	public double? Pop { get; set; }

	[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
	[JsonPropertyName("rain")]
	public Rain? Rain { get; set; }
}

public sealed class Rain
{
	[JsonPropertyName("1h")] public double The1H { get; set; }
}

public sealed class Weather
{
	[JsonPropertyName("id")] public long Id { get; set; }

	[JsonPropertyName("main")] public WeatherType Main { get; set; }

	[JsonPropertyName("description")] public string Description { get; set; }
}

public sealed class Daily
{
	[JsonPropertyName("dt")] public long Dt { get; set; }

	[JsonPropertyName("sunrise")] public long Sunrise { get; set; }

	[JsonPropertyName("sunset")] public long Sunset { get; set; }

	[JsonPropertyName("moonrise")] public long Moonrise { get; set; }

	[JsonPropertyName("moonset")] public long Moonset { get; set; }

	[JsonPropertyName("moon_phase")] public double MoonPhase { get; set; }

	[JsonPropertyName("summary")] public required string Summary { get; set; }

	[JsonPropertyName("temp")] public required Temp Temp { get; set; }

	[JsonPropertyName("feels_like")] public required FeelsLike FeelsLike { get; set; }

	[JsonPropertyName("pressure")] public double Pressure { get; set; }

	[JsonPropertyName("humidity")] public double Humidity { get; set; }

	[JsonPropertyName("dew_point")] public double DewPoint { get; set; }

	[JsonPropertyName("wind_speed")] public double WindSpeed { get; set; }

	[JsonPropertyName("wind_deg")] public long WindDeg { get; set; }

	[JsonPropertyName("wind_gust")] public double WindGust { get; set; }

	[JsonPropertyName("weather")] public required Weather[] Weather { get; set; }

	[JsonPropertyName("clouds")] public double Clouds { get; set; }

	[JsonPropertyName("pop")] public double Pop { get; set; }

	[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
	[JsonPropertyName("rain")]
	public double? Rain { get; set; }

	[JsonPropertyName("uvi")] public double Uvi { get; set; }
}

public sealed class FeelsLike
{
	[JsonPropertyName("day")] public double Day { get; set; }

	[JsonPropertyName("night")] public double Night { get; set; }

	[JsonPropertyName("eve")] public double Eve { get; set; }

	[JsonPropertyName("morn")] public double Morn { get; set; }
}

public sealed class Temp
{
	[JsonPropertyName("day")] public double Day { get; set; }

	[JsonPropertyName("min")] public double Min { get; set; }

	[JsonPropertyName("max")] public double Max { get; set; }

	[JsonPropertyName("night")] public double Night { get; set; }

	[JsonPropertyName("eve")] public double Eve { get; set; }

	[JsonPropertyName("morn")] public double Morn { get; set; }
}

public sealed class Minutely
{
	[JsonPropertyName("dt")] public long Dt { get; set; }

	[JsonPropertyName("precipitation")] public double Precipitation { get; set; }
}

public enum WeatherType
{
	Thunderstorm,
	Drizzle,
	Snow,
	Mist,
	Smoke,
	Haze,
	Dust,
	Fog,
	Sand,
	Ash,
	Squall,
	Tornado,
	Clear,
	Clouds,
	Rain
}

internal class MainConverter : JsonConverter<WeatherType>
{
	public override bool CanConvert(Type t) => t == typeof(WeatherType);

	public override WeatherType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		var value = reader.GetString();

		return value switch
		{
			"Thunderstorm" => WeatherType.Thunderstorm,
			"Drizzle" => WeatherType.Drizzle,
			"Snow" => WeatherType.Snow,
			"Mist" => WeatherType.Mist,
			"Smoke" => WeatherType.Smoke,
			"Haze" => WeatherType.Haze,
			"Dust" => WeatherType.Dust,
			"Fog" => WeatherType.Fog,
			"Sand" => WeatherType.Sand,
			"Ash" => WeatherType.Ash,
			"Squall" => WeatherType.Squall,
			"Tornado" => WeatherType.Tornado,
			"Clear" => WeatherType.Clear,
			"Clouds" => WeatherType.Clouds,
			"Rain" => WeatherType.Rain,
			_ => throw new ArgumentOutOfRangeException(nameof(value), value)
		};
	}

	public override void Write(Utf8JsonWriter writer, WeatherType value, JsonSerializerOptions options)
	{
		switch (value)
		{
			case WeatherType.Clear:
				JsonSerializer.Serialize(writer, "Clear", options);
				return;
			case WeatherType.Clouds:
				JsonSerializer.Serialize(writer, "Clouds", options);
				return;
			case WeatherType.Rain:
				JsonSerializer.Serialize(writer, "Rain", options);
				return;
		}

		throw new Exception("Cannot marshal type WeatherType");
	}

	public static readonly MainConverter Singleton = new MainConverter();
}

public class DateOnlyConverter : JsonConverter<DateOnly>
{
	private readonly string serializationFormat;

	public DateOnlyConverter() : this(null)
	{
	}

	public DateOnlyConverter(string? serializationFormat)
	{
		this.serializationFormat = serializationFormat ?? "yyyy-MM-dd";
	}

	public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		var value = reader.GetString();
		return DateOnly.Parse(value!);
	}

	public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
		=> writer.WriteStringValue(value.ToString(serializationFormat));
}

public class TimeOnlyConverter : JsonConverter<TimeOnly>
{
	private readonly string serializationFormat;

	public TimeOnlyConverter() : this(null)
	{
	}

	public TimeOnlyConverter(string? serializationFormat)
	{
		this.serializationFormat = serializationFormat ?? "HH:mm:ss.fff";
	}

	public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		var value = reader.GetString();
		return TimeOnly.Parse(value!);
	}

	public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
		=> writer.WriteStringValue(value.ToString(serializationFormat));
}

internal class IsoDateTimeOffsetConverter : JsonConverter<DateTimeOffset>
{
	public override bool CanConvert(Type t) => t == typeof(DateTimeOffset);

	private const string DefaultDateTimeFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.FFFFFFFK";

	private DateTimeStyles _dateTimeStyles = DateTimeStyles.RoundtripKind;
	private string? _dateTimeFormat;
	private CultureInfo? _culture;

	public DateTimeStyles DateTimeStyles
	{
		get => _dateTimeStyles;
		set => _dateTimeStyles = value;
	}

	public string? DateTimeFormat
	{
		get => _dateTimeFormat ?? string.Empty;
		set => _dateTimeFormat = (string.IsNullOrEmpty(value)) ? null : value;
	}

	public CultureInfo Culture
	{
		get => _culture ?? CultureInfo.CurrentCulture;
		set => _culture = value;
	}

	public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
	{
		string text;


		if ((_dateTimeStyles & DateTimeStyles.AdjustToUniversal) == DateTimeStyles.AdjustToUniversal
		    || (_dateTimeStyles & DateTimeStyles.AssumeUniversal) == DateTimeStyles.AssumeUniversal)
		{
			value = value.ToUniversalTime();
		}

		text = value.ToString(_dateTimeFormat ?? DefaultDateTimeFormat, Culture);

		writer.WriteStringValue(text);
	}

	public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		string? dateText = reader.GetString();

		if (string.IsNullOrEmpty(dateText) == false)
		{
			if (!string.IsNullOrEmpty(_dateTimeFormat))
			{
				return DateTimeOffset.ParseExact(dateText, _dateTimeFormat, Culture, _dateTimeStyles);
			}

			return DateTimeOffset.Parse(dateText, Culture, _dateTimeStyles);
		}

		return default(DateTimeOffset);
	}


	public static readonly IsoDateTimeOffsetConverter Singleton = new IsoDateTimeOffsetConverter();
}