using SecondBrain.Auth;
using SecondBrain.Business;
using SecondBrain.Domain;

namespace SecondBrain.Business.Auth;

public interface IUserRepository : IRepository<User>
{
    public Task<User> Create(RegisterRequest registerRequest);
    public Task<User?> FindByEmail(string email);
}
