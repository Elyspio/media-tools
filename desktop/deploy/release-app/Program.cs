// See https://aka.ms/new-console-template for more information


using CommandLine;
using SwaggerMerge.ReleaseApp.UpdaterClient;
using System.Net;

namespace SwaggerMerge.ReleaseApp;

internal class Program
{
	public class Options
	{
		[Option("minor", Required = false, HelpText = "Change minor version instead of revision number", Default = false)]
		public bool Minor { get; set; }
	}


	private async static Task Main(string[] args)
	{
		var arguments = Parser.Default.ParseArguments<Options>(args).Value;


		Console.WriteLine("Releasing Elytools");

		Console.WriteLine($"appDir    {Internal.AppDir}");
		Console.WriteLine($"configDir {Internal.ConfigDir}");
		Console.WriteLine($"dockerDir {Internal.DockerDir}");


		if (Directory.Exists(Internal.ReleasesDir)) Directory.Delete(Internal.ReleasesDir, true);

		var version = await UpdaterApi.GetLatestVersion();

		Console.WriteLine($"server version {version}");
		
		
		if (arguments.Minor)
		{
			version.Minor += 1;
		}
		else
		{
			version.Revision += 1;
		}

		Console.WriteLine($"next version {version}");

		Docker.Stop(Internal.DockerDir);
		Docker.Build(Internal.DockerDir, version);
		Docker.Run(Internal.DockerDir);


		await UploadInstallers(version);
	}

	private async static Task UploadInstallers(AppVersion newVersion)
	{
		var tasks = new List<Task>();

		var files = Directory.GetFiles(Internal.ReleasesDir).Select(f => Path.Combine(Internal.ReleasesDir, f)).ToList();

		var winInstaller = files.Find(f => f.EndsWith(".exe") && f.Contains(newVersion.Raw));
		if (winInstaller != null)
		{
			tasks.Add(UpdaterApi.Upload(winInstaller, newVersion, AppArch.Win64));
		}
        var winBlockmap = files.Find(f => f.EndsWith(".blockmap") && f.Contains(newVersion.Raw));
        if (winBlockmap != null)
        {
            tasks.Add(UpdaterApi.UploadBlockmap(winBlockmap, newVersion));
        }


        var debInstaller = files.Find(f => f.EndsWith(".deb"));
		if (debInstaller != null)
		{
			tasks.Add(UpdaterApi.Upload(debInstaller, newVersion, AppArch.LinuxDeb));
		}

		var snapInstaller = files.Find(f => f.EndsWith(".snap") && f.Contains(newVersion.Raw));
		if (snapInstaller != null)
		{
			tasks.Add(UpdaterApi.Upload(snapInstaller, newVersion, AppArch.LinuxSnap));
		}

		var rpmInstaller = files.Find(f => f.EndsWith(".rpm") && f.Contains(newVersion.Raw));
		if (rpmInstaller != null)
		{
			tasks.Add(UpdaterApi.Upload(rpmInstaller, newVersion, AppArch.LinuxRpm));
		}


		await Task.WhenAll(tasks.ToArray());
	}
}