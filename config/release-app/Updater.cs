using ReleaseApp.Updater;

namespace ReleaseApp;

public class UpdaterApi
{
    public static async Task Upload(string path, AppVersion version, AppArch arch)
    {
        var t = DateTime.Now;
        var api = new AppsClient { BaseUrl = "http://localhost:4000" };
        var bytes = File.ReadAllBytes(path);
        Console.WriteLine("Adding " + path);
        await api.AddAsync("Elytools", version.ToString(), arch, bytes);
        Console.WriteLine($"Added {path} in {(DateTime.Now - t).Seconds}s");

    }
}
