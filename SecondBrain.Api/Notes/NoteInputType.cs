using GraphQL.Types;
using SecondBrain.Business.Notes;
using SecondBrain.Domain;

namespace SecondBrain.Api
{
    public class NoteInputType : InputObjectGraphType<CreateNoteDto>
    {
        public NoteInputType()
        {
            Name = "NoteInput";
            Field<StringGraphType>("title");
        }
    }
}
