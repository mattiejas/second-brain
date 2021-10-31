using GraphQL.Types;

namespace SecondBrain.Api
{
    public class SecondBrainSchema : Schema, ISchema
    {
        public SecondBrainSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<SecondBrainQuery>();
            // Mutation = provider.GetRequiredService<SecondBrainMutation>();
        }
    }
}
