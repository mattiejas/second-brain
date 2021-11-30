using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecondBrain.Domain.Auth;

namespace SecondBrain.Api.Auth;

[ApiController]
[Route("/api/auth")]
public class AuthController : ControllerBase
{
  private readonly ILogger _logger;
  private readonly IUserRepository _userRepository;
  private readonly AuthService _authService;

  public AuthController(ILogger<AuthController> logger, IUserRepository userRepository, AuthService authService)
  {
    _logger = logger;
    _userRepository = userRepository;
    _authService = authService;
  }

  [HttpPost("register")]
  public async Task<IActionResult> CreateUser([FromBody] RegisterRequest user)
  {
    return Ok(await _userRepository.Create(user));
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginDto login)
  {
    return Ok(await _authService.Authenticate(login.Email, login.Password));
  }

  [Authorize]
  [HttpGet]
  public IActionResult GetCurrentUser()
  {
    var id = this.User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
    if (id != null)
    {
      var user = _userRepository.FindById(id);
      return Ok(user);
    }
    return NotFound();
  }
}
