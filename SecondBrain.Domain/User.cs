using Microsoft.AspNetCore.Identity;

namespace SecondBrain.Domain;
public class User : IdentityUser
{
    public string DisplayName { get; set; } = "";
}
