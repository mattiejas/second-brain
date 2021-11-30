using System.Net;

namespace SecondBrain.Domain.Exceptions;

public class InternalServerErrorException : HttpException
{
    private static HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError;

    public InternalServerErrorException() : base(httpStatusCode)
    {
    }

    public InternalServerErrorException(string message) : base(httpStatusCode, message)
    {
    }

    public InternalServerErrorException(string message, Exception inner) : base(httpStatusCode, message, inner)
    {
    }
}
