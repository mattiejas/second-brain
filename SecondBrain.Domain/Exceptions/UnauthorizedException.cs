using System.Net;

namespace SecondBrain.Domain.Exceptions;

public class UnauthorizedException : HttpException
{
    private static HttpStatusCode httpStatusCode = HttpStatusCode.Unauthorized;

    public UnauthorizedException() : base(httpStatusCode)
    {
    }

    public UnauthorizedException(string message) : base(httpStatusCode, message)
    {
    }

    public UnauthorizedException(string message, Exception inner) : base(httpStatusCode, message, inner)
    {
    }
}
