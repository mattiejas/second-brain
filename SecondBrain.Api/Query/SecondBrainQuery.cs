using System.Security.Claims;
using GraphQL;
using GraphQL.Types;
using SecondBrain.Api.Auth;
using SecondBrain.Api.Query;
using SecondBrain.Business.Auth;
using SecondBrain.DataAccessLayer;
using SecondBrain.Domain;

namespace SecondBrain.Api
{
    public class SecondBrainQuery : ObjectGraphType<object>
    {
        public SecondBrainQuery(AuthService authService)
        {
            FieldAsync<UserType>("auth",
                resolve: async context =>
                {
                    var userContext = context.UserContext as QueryUserContext;
                    var user = await authService.FindById(userContext.UserId);
                    return user;
                });
        }
    }
}
