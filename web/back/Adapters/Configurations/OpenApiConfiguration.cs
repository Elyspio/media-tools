using Elytools.Api.Abstractions.Helpers;

namespace Elytools.Api.Adapters.OpenWeatherMap.Configurations;

public static class OpenApiConfiguration
{
	public static string ApiKey => Env.Get<string>("OpenWeatherMap_ApiKey") ?? throw new Exception("OpenWeatherMap_ApiKey env variable missing");
}