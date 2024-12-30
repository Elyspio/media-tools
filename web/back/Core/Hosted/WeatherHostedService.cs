using Elytools.Api.Abstractions.Interfaces.Services;
using Microsoft.Extensions.Hosting;

namespace Elytools.Api.Core.Hosted;

public class WeatherHostedService : BackgroundService
{

	private IWeatherService _weatherService;

	public WeatherHostedService(IWeatherService weatherService)
	{
		_weatherService = weatherService;
	}

	protected override async Task ExecuteAsync(CancellationToken stoppingToken)
	{
		while (!stoppingToken.IsCancellationRequested)
		{
			await _weatherService.RefreshCache();

			await Task.Delay(TimeSpan.FromMinutes(30), stoppingToken);
		}
	}
}