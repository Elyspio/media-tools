using Elytools.Api.Abstractions.Interfaces.Injections;
using Elytools.Api.Adapters.OpenWeatherMap;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Memory;
using Microsoft.Extensions.DependencyInjection;

namespace Elytools.Api.Tests.Weather.Fixtures;

public class WeatherFixtures: IDisposable
{

	public  IServiceProvider Services { get; private set; }

	public WeatherFixtures()
	{
		var services = new ServiceCollection();
		services.AddModule<OpenWeatherMapModule>(GetConfiguration());
		Services = services.BuildServiceProvider();
	}


	private IConfiguration GetConfiguration()
	{
		return new ConfigurationBuilder()
			.Add(new MemoryConfigurationSource())
			.Build();

	}

	public void Dispose()
	{
		GC.SuppressFinalize(this);
	}
}