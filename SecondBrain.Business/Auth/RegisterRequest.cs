namespace SecondBrain.Auth;

public class RegisterRequest
{
    public string DisplayName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
