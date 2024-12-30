using System.ComponentModel;

namespace Elytools.Api.Abstractions.Helpers;

public static class Env
{
	public static T Get<T>(string variableName, T fallback)
	{
		var env = Environment.GetEnvironmentVariable(variableName);
		return env == null ? fallback : ConvertFromString<T>(env);
	}

	public static T? Get<T>(string variableName)
	{
		var env = Environment.GetEnvironmentVariable(variableName);
		return env == null ? default : ConvertFromString<T>(env);
	}

	private static T ConvertFromString<T>(string env)
	{
		var converter = TypeDescriptor.GetConverter(typeof(T));
		return (T)converter.ConvertFromString(env)!;
	}
}