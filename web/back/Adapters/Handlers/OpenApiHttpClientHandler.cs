using System.Web;
using Elytools.Api.Adapters.OpenWeatherMap.Configurations;

namespace Elytools.Api.Adapters.OpenWeatherMap.Handlers;

sealed class OpenApiHttpClientHandler : DelegatingHandler
{
	protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
	{
		// Check if there is already a query string
		var uriBuilder = new UriBuilder(request.RequestUri ?? new Uri("/"));
		var query = HttpUtility.ParseQueryString(uriBuilder.Query);

		// Add or update the appId query parameter
		query["appId"] = OpenApiConfiguration.ApiKey;
		uriBuilder.Query = query.ToString();

		// Update the request URI
		request.RequestUri = uriBuilder.Uri;

		return base.SendAsync(request, cancellationToken);
	}
}