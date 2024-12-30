using Elytools.Api.Abstractions.Interfaces.Adapters;
using Elytools.Api.Abstractions.Transports.Weathers;
using Elytools.Api.Tests.Weather.Fixtures;
using Microsoft.Extensions.DependencyInjection;

namespace Elytools.Api.Tests.Weather;

public class WeatherTests :  IClassFixture<WeatherFixtures>
{
	private readonly IWeatherAdapter _sut;

	public WeatherTests(WeatherFixtures fixtures)
	{
		var services = fixtures.Services;
		_sut = fixtures.Services.GetRequiredService<IWeatherAdapter>();
	}

	[Fact]
	public async Task GetWeatherAdapter()
	{
		// Act
		var result = await _sut.GetWeather(WeatherCity.Caluire);

		// Assert
		Assert.NotNull(result);
	}
}