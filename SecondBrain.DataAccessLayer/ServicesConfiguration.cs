using Microsoft.Extensions.DependencyInjection;
using SecondBrain.DataAccessLayer.Repositories;
using SecondBrain.Domain.Auth;

namespace SecondBrain.DataAccessLayer;

public static class ServicesConfiguration
{
  public static void AddDAL(this IServiceCollection services)
  {
    services.AddEntityFrameworkSqlite().AddDbContext<BrainContext>();

    // Auth
    services.AddScoped<TokenService>();
    services.AddScoped<IUserRepository, UserRepository>();
  }
}
