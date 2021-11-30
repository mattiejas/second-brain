using GraphQL.Types;
using SecondBrain.Api.Notes;
using SecondBrain.Business.Notes;
using SecondBrain.Domain;
using SecondBrain.Domain.Exceptions;

namespace SecondBrain.Api.Auth
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType(NoteService noteService)
        {
            Field(x => x.Id);
            Field(x => x.Email);
            Field(x => x.DisplayName);

            Field<ListGraphType<NoteType>>("notes", resolve: context =>
            {
                var id = context.Source?.Id;
                if (id != null) return noteService.GetNotesByUserId(id);
                throw new InternalServerErrorException("User ID cannot be null");
            });
        }
    }
}
