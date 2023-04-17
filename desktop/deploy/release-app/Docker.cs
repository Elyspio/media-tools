using SwaggerMerge.ReleaseApp.UpdaterClient;
using System.Diagnostics;

namespace SwaggerMerge.ReleaseApp;

public class Docker
{
	private static void SetupProcess(Process process)
	{
		process.StartInfo.RedirectStandardOutput = true;
		process.StartInfo.RedirectStandardError = true;
		process.StartInfo.RedirectStandardInput = true;
		process.StartInfo.UseShellExecute = false;
		process.StartInfo.CreateNoWindow = true;

		process.ErrorDataReceived += (sender, a) => Console.WriteLine(a.Data);
		process.OutputDataReceived += (sender, a) => Console.WriteLine(a.Data);
		process.EnableRaisingEvents = true;
		process.Start();
		process.BeginOutputReadLine();
		process.BeginErrorReadLine();
	}

	public static void Run(string path)
	{
		var process = new Process();
		process.StartInfo.WorkingDirectory = path;
		process.StartInfo.FileName = "docker-compose";
		process.StartInfo.Arguments = "up";

		SetupProcess(process);

		process.StandardInput.WriteLine("exit");

		process.WaitForExit();
	}

	public static void Build(string path, AppVersion appVersion)
	{
		var process = new Process();
		process.StartInfo.WorkingDirectory = path;
		process.StartInfo.FileName = "docker-compose";
		process.StartInfo.Arguments = "build --build-arg APP_VERSION=" + appVersion.Raw;

		SetupProcess(process);

		process.StandardInput.WriteLine("exit");

		process.WaitForExit();
	}

	public static void Stop(string path)
	{
		var process = new Process();
		process.StartInfo.WorkingDirectory = path;
		process.StartInfo.FileName = "docker-compose";
		process.StartInfo.Arguments = "down";

		process.StartInfo.RedirectStandardOutput = true;
		process.StartInfo.RedirectStandardError = true;
		process.StartInfo.RedirectStandardInput = true;
		process.StartInfo.UseShellExecute = false;
		process.StartInfo.CreateNoWindow = true;

		process.ErrorDataReceived += (sender, a) => Console.WriteLine(a.Data);
		;
		process.OutputDataReceived += (sender, a) => Console.WriteLine(a.Data);
		;
		process.EnableRaisingEvents = true;
		process.Start();
		process.BeginOutputReadLine();
		process.BeginErrorReadLine();

		process.StandardInput.WriteLine("exit");

		process.WaitForExit();
	}
}