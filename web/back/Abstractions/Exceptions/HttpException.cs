using System.Net;

namespace Elytools.Api.Abstractions.Exceptions;

public class HttpException : Exception
{
	public HttpException(string message, Exception? innerException, HttpStatusCode code = HttpStatusCode.InternalServerError) : base(message, innerException)
	{
		Code = code;
	}

	public HttpException(string message, HttpStatusCode code = HttpStatusCode.InternalServerError) : base(message)
	{
		Code = code;
	}

	public HttpStatusCode Code { get; }
}