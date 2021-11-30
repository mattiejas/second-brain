using GraphQL.Types;
using SecondBrain.Api.Auth;
using SecondBrain.Api.Blocks;
using SecondBrain.Domain;

namespace SecondBrain.Api.Notes
{
    public class NoteType : ObjectGraphType<Note>
    {
        public NoteType()
        {
            Field(x => x.Id);
            Field(x => x.UpdatedAt);
            Field(x => x.CreatedAt);
            Field(x => x.Title);
            Field<ListGraphType<BlockType>>("content");
            Field<UserType>("author");
            Field<IdGraphType>("authorId");
        }
    }
}
