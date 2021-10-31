using GraphQL.Types;

namespace SecondBrain.Api.Blocks;

public class BlockDataEnum : EnumerationGraphType
{
    public BlockDataEnum()
    {
        Name = "BlockData";
        Description = "Type of content the block has.";
        AddValue("Text", "Text block.", 0);
    }
}
