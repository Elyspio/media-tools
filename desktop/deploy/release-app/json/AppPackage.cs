using Newtonsoft.Json;

namespace SwaggerMerge.ReleaseApp.json;

public class AppPackage
{
    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("version")]
    public string Version { get; set; }

    [JsonProperty("main")]
    public string Main { get; set; }

    [JsonProperty("description")]
    public string Description { get; set; }

    [JsonProperty("author")]
    public Author Author { get; set; }

    [JsonProperty("dependencies")]
    public Dictionary<string, string> Dependencies { get; set; }

    [JsonProperty("devDependencies")]
    public Dictionary<string, string> DevDependencies { get; set; }
}
