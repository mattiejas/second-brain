using GraphQL.Types;
using SecondBrain.Domain;

namespace SecondBrain.Api.Auth
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field<NonNullGraphType<IdGraphType>>("id");
            Field(x => x.Email);
            Field(x => x.DisplayName);
        }
    }
}
