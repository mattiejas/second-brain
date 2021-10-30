using Microsoft.Extensions.DependencyInjection;
using SecondBrain.Business.Auth;

public static class ServicesConfiguration
{
    public static void AddBusiness(this IServiceCollection services)
    {
        services.AddScoped<AuthService>();
    }
}
