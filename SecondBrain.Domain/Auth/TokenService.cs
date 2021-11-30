using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SecondBrain.Domain;

namespace SecondBrain.Domain.Auth
{
  public class TokenService
  {
    private TimeSpan ExpiryDuration = new TimeSpan(7, 0, 0, 0);

    public string GenerateToken(User user, string key, string issuer = "SecondBrain.Api")
    {
      var claims = new[]
      {
                new Claim(ClaimTypes.Name, user.DisplayName),
                new Claim("id", user.Id)
            };

      var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
      var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
      var tokenDescriptor = new JwtSecurityToken(issuer, issuer, claims, expires: DateTime.Now.Add(ExpiryDuration), signingCredentials: credentials);
      return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
  }
}
