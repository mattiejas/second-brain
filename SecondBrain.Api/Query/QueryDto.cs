using GraphQL;

namespace SecondBrain.Api.Query;

public class QueryDto
{
    public string? OperationName { get; set; } = String.Empty;
    public string? NamedQuery { get; set; } = String.Empty;
    public string? Query { get; set; } = String.Empty;
    public Dictionary<string, object> Variables { get; set; }
}
