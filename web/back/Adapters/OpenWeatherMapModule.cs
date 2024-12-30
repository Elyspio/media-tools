using Elytools.Api.Abstractions.Interfaces.Injections;
using Elytools.Api.Adapters.OpenWeatherMap.Adapters;
using Elytools.Api.Adapters.OpenWeatherMap.Assemblers;
using Elytools.Api.Adapters.OpenWeatherMap.Handlers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Elytools.Api.Adapters.OpenWeatherMap;

public class OpenWeatherMapModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		services.AddHttpClient(WeatherAdapter.ClientName).AddHttpMessageHandler<OpenApiHttpClientHandler>();

		services.AddTransient<OpenApiHttpClientHandler>();

		services.Scan(scan => scan
			.FromAssemblyOf<OpenWeatherMapModule>()
			.AddClasses(classes => classes.InNamespaceOf<WeatherAdapter>())
			.AsImplementedInterfaces()
			.WithSingletonLifetime());

		services.Scan(scan => scan
			.FromAssemblyOf<OpenWeatherMapModule>()
			.AddClasses(classes => classes.InNamespaceOf<GetWeatherAssembler>())
			.AsSelf()
			.WithSingletonLifetime());
	}
}