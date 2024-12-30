using System.Net;
using System.Text.Json.Serialization;
using Elytools.Api.Abstractions.Extensions;
using Elytools.Api.Abstractions.Helpers;
using Elytools.Api.Abstractions.Interfaces.Injections;
using Elytools.Api.Adapters.OpenWeatherMap;
using Elytools.Api.Core;
using Elytools.Api.Web.Filters;
using Elytools.Api.Web.Processors;
using Elytools.Api.Web.Utils;
using Mapster;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using MongoDB.Bson;
using Newtonsoft.Json.Converters;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

namespace Elytools.Api.Web.Server;

public class ServerBuilder
{
	private readonly string _frontPath = Env.Get("FRONT_PATH", "/front");

	public ServerBuilder(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);


		Log.Logger = new LoggerConfiguration()
			.MinimumLevel.Debug()
			.WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level} {SourceContext:l}] {Message:lj}{NewLine}{Exception}", theme: AnsiConsoleTheme.Sixteen)
			.CreateLogger();

		// Setup Logging
		builder.Host.UseSerilog((_, lc) => lc
			.MinimumLevel.Debug()
			.Filter.ByExcluding(e => e.Level == LogEventLevel.Debug && e.Properties["SourceContext"].ToString().Contains("Microsoft"))
			.Enrich.FromLogContext()
			.WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level} {SourceContext:l}] {Message:lj}{NewLine}{Exception}", theme: AnsiConsoleTheme.Sixteen)
		);

		if (builder.Environment.IsDevelopment())
		{
			// Setup CORS
			builder.Services.AddCors(options =>
				{
					options.AddPolicy("Cors", b =>
						{
							b.WithOrigins("http://localhost:3000");
							b.AllowAnyHeader();
							b.AllowAnyMethod();
							b.AllowCredentials();
						}
					);

					options.DefaultPolicyName = "Cors";
				}
			);
		}



		builder.Services.AddModule<OpenWeatherMapModule>(builder.Configuration);
		builder.Services.AddModule<CoreModule>(builder.Configuration);

		builder.Services.AddLogging(log => { log.AddConsole(); });

		// Convert Enum to String 
		builder.Services.AddControllers(o =>
				{
					o.Conventions.Add(new ControllerDocumentationConvention());
					o.OutputFormatters.RemoveType<StringOutputFormatter>();
					o.Filters.Add<HttpExceptionFilter>();
				}
			)
			.AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
			.AddNewtonsoftJson(x => x.SerializerSettings.Converters.Add(new StringEnumConverter()));

		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddOpenApiDocument(document =>
		{
			document.DocumentName = "Elytools.Api";
			document.Title = "Elytools.Api";
			document.SchemaSettings.SchemaProcessors.Add(new NullableSchemaProcessor());
			document.OperationProcessors.Add(new NullableOperationProcessor());
		});
		// Setup SPA Serving
		if (builder.Environment.IsProduction()) Console.WriteLine($"Server in production, serving SPA from {_frontPath} folder");

		builder.Services.AddSignalR(options =>
			{
				options.EnableDetailedErrors = true;
				options.MaximumReceiveMessageSize = 10_000_000;
			})
			.AddJsonProtocol(options =>
				{
					options.PayloadSerializerOptions.IncludeFields = true;
					options.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter());
				}
			);

		TypeAdapterConfig.GlobalSettings.ForType<Guid, ObjectId>().MapWith(id => id.AsObjectId());
		TypeAdapterConfig.GlobalSettings.ForType<ObjectId, Guid>().MapWith(id => id.AsGuid());

		Application = builder.Build();
	}

	public WebApplication Application { get; }
}