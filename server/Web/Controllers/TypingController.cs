using Elytools.Api.Abstractions.Interfaces.Hubs;
using Microsoft.AspNetCore.Mvc;

namespace Elytools.Api.Web.Controllers;

[ApiController]
[Route("api/types")]
public class TypingController
{
	[HttpGet]
	public Types GetTypes()
	{
		return null;
	}
}

public record Types(Frame Frame);