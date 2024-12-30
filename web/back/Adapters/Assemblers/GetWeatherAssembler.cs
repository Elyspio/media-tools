using Elytools.Api.Abstractions.Assemblers;
using Elytools.Api.Abstractions.Transports.Weathers.Reponses;
using Elytools.Api.Abstractions.Transports.Weathers.Results;

namespace Elytools.Api.Adapters.OpenWeatherMap.Assemblers;

public sealed class GetWeatherAssembler : BaseAssembler<GetWeatherResponse, GetWeatherResult>
{

	private DateTime UnixTimeStampToDateTime(long unixTimeStamp, long offset)
	{
		var dateTime = new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.FromSeconds(offset));
		dateTime = dateTime.AddSeconds(unixTimeStamp);
		return dateTime.DateTime;
	}

	private double ConvertToCelsius(double kelvin) => Math.Round(kelvin - 273.15, 1);

	public override GetWeatherResult Convert(GetWeatherResponse obj)
	{
		return new GetWeatherResult
		{
			Current = new Forecast(
				UnixTimeStampToDateTime(obj.Current.Dt, obj.TimezoneOffset),
				new Temperature(ConvertToCelsius(obj.Current.Temp), ConvertToCelsius(obj.Current.FeelsLike)),
				obj.Current.Weather[0].Main,
				obj.Current.Rain?.The1H
			),
			Hourly = obj.Hourly.Select(hr => new Forecast(
				UnixTimeStampToDateTime(hr.Dt, obj.TimezoneOffset),
				new Temperature(ConvertToCelsius(hr.Temp), ConvertToCelsius(hr.FeelsLike)),
				hr.Weather[0].Main,
				hr.Rain?.The1H
			)).ToArray()
		};
	}

	public override GetWeatherResponse Convert(GetWeatherResult obj)
	{
		throw new NotImplementedException();
	}
}