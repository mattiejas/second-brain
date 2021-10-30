using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SecondBrain.Auth;
using SecondBrain.Business.Auth;
using SecondBrain.Domain;

namespace SecondBrain.DataAccessLayer.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly BrainContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(BrainContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<User> Create(RegisterRequest registerRequest)
        {
            var result = await _userManager.CreateAsync(new User
            {
                DisplayName = registerRequest.DisplayName,
                UserName = registerRequest.DisplayName,
                Email = registerRequest.Email
            }, registerRequest.Password);

            if (result.Succeeded) return await _context.Users.Where(u => u.Email == registerRequest.Email).FirstOrDefaultAsync();

            throw new Exception(result.ToString());
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }
}
