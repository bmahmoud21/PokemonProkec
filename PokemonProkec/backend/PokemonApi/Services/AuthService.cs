using System.Threading.Tasks;
using PokemonApi.Models; 
using PokemonApi.Repositories;

namespace PokemonApi.Services
{
    public class AuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<User> RegisterAsync(User user, string password)
        {
            if (await _authRepository.UserExistsAsync(user.Username))
                return null;

            return await _authRepository.RegisterAsync(user, password);
        }

        public async Task<User> LoginAsync(string username, string password)
        {
            return await _authRepository.LoginAsync(username, password);
        }
    }
}