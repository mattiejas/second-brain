using GraphQL.Types;
using SecondBrain.Domain;

namespace SecondBrain.Api.Blocks
{
    public class BlockType : ObjectGraphType<Block>
    {
        public BlockType()
        {
            Field(x => x.Id);
            Field(x => x.UpdatedAt);
            Field(x => x.CreatedAt);
            Field(x => x.Data);
            Field(x => x.Type);
        }
    }
}
