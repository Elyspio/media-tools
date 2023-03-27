using Elytools.Api.Sockets.Hubs;

namespace Elytools.Api.Web.Server;

public static class ApplicationServer
{
	public static WebApplication Initialize(this WebApplication application)
	{
		// Allow CORS
		application.UseCors("Cors");

		application.UseOpenApi();
		application.UseSwaggerUi3();

		// Start Dependency Injection
		application.UseAdvancedDependencyInjection();

		// Setup Controllers
		application.MapControllers();

		application.UseAuthentication();

		application.MapHub<ScreenShare>("/ws/screen-share");


		// Start SPA serving
		if (application.Environment.IsProduction())
		{
			application.UseRouting();

			application.UseDefaultFiles(new DefaultFilesOptions
				{
					DefaultFileNames = new List<string>
					{
						"index.html"
					},
					RedirectToAppendTrailingSlash = true
				}
			);


			application.UseStaticFiles();

			application.MapFallbackToFile("/index.html");
		}

		return application;
	}
}