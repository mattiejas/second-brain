using GraphQL.Types;
using SecondBrain.Domain;

namespace SecondBrain.Api.Auth
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(x => x.Id);
            Field(x => x.Email);
            Field(x => x.DisplayName);
        }
    }
}
