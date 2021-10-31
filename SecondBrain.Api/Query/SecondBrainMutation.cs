using GraphQL;
using GraphQL.Types;
using SecondBrain.Api.Notes;
using SecondBrain.Business.Notes;
using SecondBrain.Domain;

namespace SecondBrain.Api
{
    public class SecondBrainMutation : ObjectGraphType
    {
        public SecondBrainMutation(NoteService noteService)
        {
            Field<NoteType>(
                  "createNote",
                  arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<NoteInputType>> { Name = "note" }
                  ),
                  resolve: context =>
                  {
                      var note = context.GetArgument<Note>("note");
                      return noteService.CreateNote(note);
                  });
        }
    }
}
