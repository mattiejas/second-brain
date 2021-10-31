using Microsoft.Extensions.DependencyInjection;
using SecondBrain.Business.Auth;
using SecondBrain.Business.Notes;

public static class ServicesConfiguration
{
    public static void AddBusiness(this IServiceCollection services)
    {
        services.AddScoped<AuthService>();
        services.AddScoped<NoteService>();
    }
}
