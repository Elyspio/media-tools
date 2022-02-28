namespace ReleaseApp.Json;


using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using ReleaseApp.Updater.Model;
using System.Globalization;

public static class Converter
{
    public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
    {
        MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
        DateParseHandling = DateParseHandling.None,
        Converters =
        {
            new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
        },
    };

    public static AppVersion ParseVersion(string version)
    {
        var versionParts = version.Split('.');
        return new AppVersion
        {
            Major = int.Parse(versionParts[0]),
            Minor = int.Parse(versionParts[1]),
            Revision = int.Parse(versionParts[2]),
        };
    }
}


