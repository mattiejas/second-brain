using System.Net;

namespace SecondBrain.Domain.Exceptions;

public class NotFoundException : HttpException
{
    private static HttpStatusCode httpStatusCode = HttpStatusCode.NotFound;

    public NotFoundException() : base(httpStatusCode)
    {
    }

    public NotFoundException(string message) : base(httpStatusCode, message)
    {
    }

    public NotFoundException(string message, Exception inner) : base(httpStatusCode, message, inner)
    {
    }
}
