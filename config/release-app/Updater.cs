using ReleaseApp.Updater.Api;
using ReleaseApp.Updater.Model;

namespace ReleaseApp;

public class UpdaterApi
{
    public static async Task Upload(string path, AppVersion version, AppArch arch)
    {
        var api = new AppsApi("http://127.0.0.1:4000");
        var bytes = File.ReadAllBytes(path).Select(x => (int)x).ToList();
        Console.WriteLine("Adding " + path);
        await api.AddAsync(new AddApp(bytes, new AppMetadata("Elytools", version, arch)));
        Console.WriteLine("Added " + path);

    }
}
