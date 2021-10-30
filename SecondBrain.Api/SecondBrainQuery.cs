using GraphQL.Types;
using SecondBrain.Api.Auth;
using SecondBrain.Business.Auth;
using SecondBrain.DataAccessLayer;
using SecondBrain.Domain;

namespace SecondBrain.Api
{

    public class SecondBrainQuery : ObjectGraphType<object>
    {
        public SecondBrainQuery(AuthService authService)
        {
            Field<ListGraphType<UserType>>()
                .Name("user")
                .Argument<NonNullGraphType<IdGraphType>>("id")
                .Resolve(context =>
                {
                    var id = (context.Arguments?["id"].Value ?? "") as string;
                    return authService.FindById(id);
                });
        }
    }
}
