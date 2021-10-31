using GraphQL.Types;
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
            Field(x => x.Content);
            Field<NoteType>("Author");
            Field<IdGraphType>("AuthorId");
        }
    }
}
