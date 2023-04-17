using SwaggerMerge.ReleaseApp.UpdaterClient;

namespace SwaggerMerge.ReleaseApp;

public class UpdaterApi
{
    private static readonly AppsClient Api = new() { BaseUrl = "https://elyspio.fr/updater" };
    private static readonly ElectronAppsClient ElectronApi = new() { BaseUrl = "https://elyspio.fr/updater" };
    
    private const string AppName = "Elytools";

    public async static Task Upload(string path, AppVersion version, AppArch arch)
    {
        try
        {
            var startTime = DateTime.Now;
            var bytes = await File.ReadAllBytesAsync(path);
            Console.WriteLine("Adding " + path);
            await Api.AddFromBytesAsync(AppName, version.ToString(), arch, bytes);
            Console.WriteLine($"Added {path} in {(DateTime.Now - startTime).Seconds}s");
        }

        catch(Exception e)
        {
            await Console.Error.WriteLineAsync($"Error in upload of {path}, retry in 1s");
            await Console.Error.WriteLineAsync(e.ToString());
            await Task.Delay(1000);
            await Upload(path, version, arch);
        }
    }


    public async static Task UploadBlockmap(string path, AppVersion version)
    {
        try
        {
            var startTime = DateTime.Now;
            var bytes = await File.ReadAllBytesAsync(path);
            Console.WriteLine("Adding " + path);
            await ElectronApi.AddBlockmapAsync(AppName, AppArch.Win64, version.ToString(), bytes);
            Console.WriteLine($"Added {path} in {(DateTime.Now - startTime).Seconds}s");
        }

        catch (Exception e)
        {
            await Console.Error.WriteLineAsync($"Error in upload of {path}, retry in 1s");
            await Console.Error.WriteLineAsync(e.ToString());
            await Task.Delay(1000);
            await UploadBlockmap(path, version);
        }
    }



    public async static Task<AppVersion> GetLatestVersion()
    {
        try
        {
            return await Api.GetLatestVersionAsync(AppName);
        }
        catch (Exception e)
        {
            return "1.3.0";
        }
    }
}
