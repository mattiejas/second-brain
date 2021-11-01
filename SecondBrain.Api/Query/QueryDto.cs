using System.Text.Json.Serialization;
using GraphQL;

namespace SecondBrain.Api.Query;

public class QueryDto
{
    public string? OperationName { get; set; } = String.Empty;
    public string? NamedQuery { get; set; } = String.Empty;
    public string? Query { get; set; } = String.Empty;

    [JsonConverter(typeof(GraphQL.SystemTextJson.ObjectDictionaryConverter))]
    public Dictionary<string, object> Variables { get; set; }
}
