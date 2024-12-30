using System.Net;
using Elytools.Api.Abstractions.Exceptions;
using Elytools.Api.Abstractions.Interfaces.Hubs;
using Microsoft.AspNetCore.Mvc;

namespace Elytools.Api.Web.Controllers;

[ApiController]
[Route("api/types")]
public class TypingController
{
	[HttpGet]
	public Types GetTypes() => throw new HttpException("Controller only used for type generation purpose", HttpStatusCode.NotImplemented);
}

public sealed record Types(Frame Frame);