using System.Net;

namespace SecondBrain.Domain.Exceptions;

public class BadRequestException : HttpException
{
    private static HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest;

    public BadRequestException() : base(httpStatusCode)
    {
    }

    public BadRequestException(string message) : base(httpStatusCode, message)
    {
    }

    public BadRequestException(string message, Exception inner) : base(httpStatusCode, message, inner)
    {
    }
}
