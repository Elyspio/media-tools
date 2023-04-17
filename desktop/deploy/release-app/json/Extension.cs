namespace SwaggerMerge.ReleaseApp.UpdaterClient;

public partial class AppVersion
{
    public AppVersion Clone()
    {
        return new AppVersion
        {

            Revision = Revision,
            Raw = Raw,
            Major = Major,
            Minor = Minor,
        };
    }

    public override string ToString()
    {
        Raw = $"{Major}.{Minor}.{Revision}";
        return Raw;    
    }

    public static implicit operator AppVersion(string raw)
    {
        var versions =  raw.Split('.');

        return new()
        {
            Major = int.Parse(versions[0]),
            Minor = int.Parse(versions[1]),
            Revision = int.Parse(versions[2]),
            Raw = raw
        };
    }



}