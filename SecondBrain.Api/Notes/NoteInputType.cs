using GraphQL.Types;
using SecondBrain.Domain;

namespace SecondBrain.Api
{
    public class NoteInputType : InputObjectGraphType<Note>
    {
        public NoteInputType()
        {
            Name = "NoteInput";
            Field<NonNullGraphType<StringGraphType>>("title");
            Field<NonNullGraphType<StringGraphType>>("authorId");
        }
    }
}
