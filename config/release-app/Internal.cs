using Newtonsoft.Json;
using ReleaseApp.Json;
using ReleaseApp.Updater.Model;


namespace ReleaseApp
{
    public class Internal
    {
        public static readonly string ScriptDir = Path.GetDirectoryName(GetCurrentFileName())!;
        public static readonly string RootDir = Path.GetFullPath(Path.Combine(ScriptDir, "..", ".."))!;
        public static readonly string ConfigDir = Path.GetFullPath(Path.Combine(RootDir, "config"))!;
        public static readonly string AppDir = Path.GetFullPath(Path.Combine(RootDir, "app"))!;
        public static readonly string DockerDir = Path.GetFullPath(Path.Combine(ScriptDir, "docker"))!;
        public static readonly string ReleasesDir = Path.GetFullPath(Path.Combine(ScriptDir, "releases"))!;

        static string GetCurrentFileName([System.Runtime.CompilerServices.CallerFilePath] string fileName = null)
        {
            return fileName;
        }

        public static void UpdateVersions(AppVersion version)
        {
            var packageJson = Path.Combine(RootDir, "package.json");
            var data = JsonConvert.DeserializeObject<RootPackage>(File.ReadAllText(packageJson));
            data.Version = version.Raw;
            Stringify(packageJson, data);

            var appPackageJson = Path.Combine(AppDir, "package.json");
            var appData = JsonConvert.DeserializeObject<AppPackage>(File.ReadAllText(appPackageJson));
            appData.Version = version.Raw;
            Stringify(appPackageJson, appData);
        }
        public static AppVersion GetRootVersion()
        {
            var packageJson = Path.Combine(RootDir, "package.json");
            var data = JsonConvert.DeserializeObject<RootPackage>(File.ReadAllText(packageJson));
            return Converter.ParseVersion(data.Version);
        }

        public static AppVersion GetAppVersion()
        {
            var packageJson = Path.Combine(AppDir, "package.json");
            var data = JsonConvert.DeserializeObject<AppPackage>(File.ReadAllText(packageJson));
            return Converter.ParseVersion(data.Version);
        }

        private static void Stringify(string path, object obj)
        {
            using var fs = File.Create(path);
            using var sw = new StreamWriter(fs);
            using var jtw = new JsonTextWriter(sw)
            {
                Formatting = Formatting.Indented,
                Indentation = 1,
                IndentChar = '\t'
            };
            new JsonSerializer().Serialize(jtw, obj);
        }
    }
}
