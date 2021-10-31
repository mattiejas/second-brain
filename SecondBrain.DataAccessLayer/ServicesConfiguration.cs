using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SecondBrain.Auth;
using SecondBrain.Business.Auth;
using SecondBrain.Business.Notes;
using SecondBrain.DataAccessLayer.Repositories;
using SecondBrain.Domain;

namespace SecondBrain.DataAccessLayer;

public static class ServicesConfiguration
{
    public static void AddDAL(this IServiceCollection services)
    {
        services.AddEntityFrameworkSqlite().AddDbContext<BrainContext>();

        // Auth
        services.AddScoped<TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<INoteRepository, NoteRepository>();
    }
}
