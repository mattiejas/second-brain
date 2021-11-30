using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using SecondBrain.Domain.Config;
using SecondBrain.Domain.Exceptions;

namespace SecondBrain.Domain.Auth
{
  public class AuthService
  {
    private readonly UserManager<User> _userManager;
    private readonly IUserRepository _userRepository;
    private readonly TokenService _tokenService;
    private readonly IOptions<SecurityOptions> _securityOptions;

    public AuthService(UserManager<User> userManager, IUserRepository userRepository, TokenService tokenService, IOptions<SecurityOptions> securityOptions)
    {
      _userManager = userManager;
      _userRepository = userRepository;
      _tokenService = tokenService;
      _securityOptions = securityOptions;
    }

    public async Task<string> Authenticate(string email, string password)
    {
      var user = await _userRepository.FindByEmail(email);

      if (user == null)
      {
        throw new NotFoundException($"User not found with email '{email}'.");
      }

      var result = _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password);

      if (result == PasswordVerificationResult.Failed)
      {
        throw new UnauthorizedException("Invalid email/password combination.");
      }

      return _tokenService.GenerateToken(user, _securityOptions.Value.Secret);
    }

    public async Task<User> FindById(int id)
    {
      return await this._userRepository.FindByIdAsync(id);
    }
  }
}
