using GraphQL;
using GraphQL.Types;
using SecondBrain.Api.Blocks;
using SecondBrain.Api.Notes;
using SecondBrain.Domain;

namespace SecondBrain.Api
{
    public class SecondBrainSchema : Schema, ISchema
    {
        public SecondBrainSchema(IServiceProvider provider) : base(provider)
        {
            this.RegisterTypeMapping<Block, BlockType>();
            this.RegisterTypeMapping<BlockData, BlockDataEnum>();
            this.RegisterTypeMapping<Note, NoteType>();

            Query = provider.GetRequiredService<SecondBrainQuery>();
            // Mutation = provider.GetRequiredService<SecondBrainMutation>();
        }
    }
}
