using Elytools.Api.Abstractions.Interfaces.Injections;
using Elytools.Api.Core.Hosted;
using Elytools.Api.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Elytools.Api.Core;

public class CoreModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var nsp = typeof(CoreModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf('.')];
		services.Scan(scan => scan
			.FromAssemblyOf<CoreModule>()
			.AddClasses(classes => classes.InNamespaceOf<WeatherService>())
			.AsImplementedInterfaces()
			.WithSingletonLifetime()
		);



		services.AddHostedService<WeatherHostedService>();
		services.AddHybridCache();

		var redisConnectionString = configuration.GetValue<string?>("Redis");

		if (redisConnectionString is not null)
		{
			Log.Information("Using Redis cache with connection string: {Redis}", redisConnectionString);
			services.AddStackExchangeRedisCache(o =>
			{
				o.Configuration = redisConnectionString;
			});
		}
		else
		{
			Log.Information("Using Memory cache");
		}


	}
}