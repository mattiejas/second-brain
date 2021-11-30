namespace SecondBrain.Domain.Auth;

public interface IUserRepository : IRepository<User>
{
  public Task<User> Create(RegisterRequest registerRequest);
  public Task<User?> FindByEmail(string email);
}
