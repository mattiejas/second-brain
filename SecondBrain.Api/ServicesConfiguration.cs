using GraphQL;
using GraphQL.SystemTextJson;
using GraphQL.Types;
using SecondBrain.Api;
using SecondBrain.Api.Auth;
using SecondBrain.Api.Blocks;
using SecondBrain.Api.Notes;

public static class ServicesConfiguration
{
    public static void AddApi(this IServiceCollection services)
    {
        services.AddScoped<IDocumentExecuter, DocumentExecuter>();
        services.AddScoped<IDocumentWriter, DocumentWriter>();

        services.AddScoped<SecondBrainQuery>();
        services.AddScoped<SecondBrainMutation>();

        services.AddScoped<UserType>();
        services.AddScoped<NoteType>();
        services.AddScoped<BlockType>();
        services.AddScoped<BlockDataEnum>();

        services.AddScoped<ISchema, SecondBrainSchema>();
        services.AddControllers();
    }
}
