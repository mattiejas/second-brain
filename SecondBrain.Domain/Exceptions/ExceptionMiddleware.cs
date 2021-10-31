using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Logging;

namespace SecondBrain.Domain.Exceptions;

public class ExceptionMiddleware
{
    private readonly RequestDelegate next;
    private readonly ILogger logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        this.next = next;
        this.logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await this.next.Invoke(context);
        }
        catch (Exception e)
        {
            if (e is not HttpException)
            {
                this.logger.LogError($"Something went wrong: {e}");
                context.Response.StatusCode = (int)StatusCodes.Status500InternalServerError;
            }
        }
    }
}

