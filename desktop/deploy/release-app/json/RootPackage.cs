using Newtonsoft.Json;

namespace SwaggerMerge.ReleaseApp.json;

public class RootPackage
{
    [JsonProperty("version")]
    public string Version { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("main")]
    public string Main { get; set; }

    [JsonProperty("scripts")]
    public Dictionary<string, string> Scripts { get; set; }

    [JsonProperty("build")]
    public Build Build { get; set; }

    [JsonProperty("author")]
    public Author Author { get; set; }

    [JsonProperty("license")]
    public string License { get; set; }

    [JsonProperty("devDependencies")]
    public Dictionary<string, string> DevDependencies { get; set; }
}

public class Author
{
    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("email")]
    public string Email { get; set; }
}

public class Build
{
    [JsonProperty("productName")]
    public string ProductName { get; set; }

    [JsonProperty("appId")]
    public string AppId { get; set; }

    [JsonProperty("directories")]
    public Directories Directories { get; set; }

    [JsonProperty("linux")]
    public Linux Linux { get; set; }

    [JsonProperty("win")]
    public Win Win { get; set; }
}

public class Directories
{
    [JsonProperty("app")]
    public string App { get; set; }

    [JsonProperty("output")]
    public string Output { get; set; }

    [JsonProperty("buildResources")]
    public string BuildResources { get; set; }
}

public class Linux
{
    [JsonProperty("category")]
    public string Category { get; set; }

    [JsonProperty("target")]
    public List<string> Target { get; set; }
}

public class Win
{
    [JsonProperty("target")]
    public List<Target> Target { get; set; }
}

public class Target
{
    [JsonProperty("target")]
    public string TargetTarget { get; set; }

    [JsonProperty("arch")]
    public List<string> Arch { get; set; }
}



