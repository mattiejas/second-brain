using System.Security.Claims;

namespace SecondBrain.Api.Query
{
    public class QueryUserContext : Dictionary<string, object?>
    {
        private const string USER = "User";

        public QueryUserContext(ClaimsPrincipal user)
        {
            this[USER] = user;
        }

        public ClaimsPrincipal User
        {
            get { return (ClaimsPrincipal)this[USER]; }
        }

        public string UserId
        {
            get
            {
                return User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            }
        }
    }
}
