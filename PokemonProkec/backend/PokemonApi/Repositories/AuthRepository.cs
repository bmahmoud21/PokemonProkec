using System.Threading.Tasks;
using PokemonApi.Models; 
using System.Linq;
using PokemonApi.Data;

namespace PokemonApi.Repositories
{
    public interface IAuthRepository
    {
        Task<User> RegisterAsync(User user, string password);
        Task<User> LoginAsync(string username, string password);
        Task<bool> UserExistsAsync(string username);
    }

    public class AuthRepository : IAuthRepository
    {
        private readonly PokemonContext _context;

        public AuthRepository(PokemonContext context)
        {
            _context = context;
        }

        public async Task<User> RegisterAsync(User user, string password)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> LoginAsync(string username, string password)
        {
            var user = _context.Users.SingleOrDefault(u => u.Username == username);
            if (user == null) return null;

            bool verified = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return verified ? user : null;
        }

        public async Task<bool> UserExistsAsync(string username)
        {
            return _context.Users.Any(u => u.Username == username);
        }
    }
}