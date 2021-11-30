namespace SecondBrain.Domain;

using Microsoft.Extensions.DependencyInjection;
using SecondBrain.Domain.Auth;

public static class ServicesConfiguration
{
  public static void AddBusiness(this IServiceCollection services)
  {
    services.AddScoped<AuthService>();
  }
}
