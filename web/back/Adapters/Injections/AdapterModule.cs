using Elytools.Api.Abstractions.Interfaces.Injections;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Elytools.Api.Adapters.Injections;

public class AdapterModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
	}
}