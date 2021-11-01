using GraphQL;
using GraphQL.Types;
using SecondBrain.Api.Notes;
using SecondBrain.Api.Query;
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
                    new QueryArgument<NonNullGraphType<NoteInputType>> { Name = "note", Description = "The note you want to create." }
                  ),
                  resolve: context =>
                  {
                      var note = context.GetArgument<CreateNoteDto>("note");
                      return noteService.CreateNote(note, (context.UserContext as QueryUserContext).UserId);
                  });
        }
    }
}
