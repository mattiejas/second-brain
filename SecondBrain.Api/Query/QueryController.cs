using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SecondBrain.Auth;
using SecondBrain.Business;
using SecondBrain.Business.Auth;
using SecondBrain.Domain;
using SecondBrain.Domain.Exceptions;

namespace SecondBrain.Api.Query
{
    [ApiController]
    [Route("graphql")]
    public class QueryController : ControllerBase
    {
        private readonly ISchema _schema;
        private readonly IDocumentExecuter _executer;
        private readonly IDocumentWriter _writer;

        private readonly ILogger<QueryController> _logger;
        public QueryController(ISchema schema, IDocumentExecuter executer, IDocumentWriter writer, ILogger<QueryController> logger)
        {
            _schema = schema;
            _executer = executer;
            _logger = logger;
            _writer = writer;
        }

        [Authorize]
        [HttpPost]
        public async Task Post([FromBody] QueryDto query, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Query: {0}", query.Query);

            var result = await _executer.ExecuteAsync(_ =>
            {
                _.Schema = _schema;
                _.Query = query.Query;
                _.Inputs = query.Variables.ToInputs();
                _.UserContext = new QueryUserContext(this.User);
            });

            if (result.Errors?.Count > 0)
            {
                throw new HttpException(System.Net.HttpStatusCode.BadRequest, String.Join(Environment.NewLine, result.Errors));
            }

            await WriteResponseAsync(HttpContext, result, cancellationToken);
        }

        private async Task WriteResponseAsync(HttpContext context, ExecutionResult result, CancellationToken cancellationToken)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 200; // OK

            await _writer.WriteAsync(context.Response.Body, result, cancellationToken);
        }
    }
}
