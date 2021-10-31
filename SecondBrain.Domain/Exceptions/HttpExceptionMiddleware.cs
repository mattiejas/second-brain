using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Logging;

namespace SecondBrain.Domain.Exceptions;

public class HttpExceptionMiddleware
{
    private readonly RequestDelegate next;
    private readonly ILogger logger;

    public HttpExceptionMiddleware(RequestDelegate next, ILogger<HttpExceptionMiddleware> logger)
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
        catch (HttpException httpException)
        {
            context.Response.StatusCode = httpException.StatusCode;
            var responseFeature = context.Features.Get<IHttpResponseFeature>();
            responseFeature.ReasonPhrase = httpException.Message;
        }
    }
}
