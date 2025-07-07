using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;
using PokemonApi.Services;

namespace PokemonApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto dto)
        {
            var user = new User
            {
                Username = dto.Username
            };

            var result = await _authService.RegisterAsync(user, dto.Password);
            if (result == null)
                return BadRequest("Username already exists.");

            return Ok("Registration successful");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto dto)
        {
            var user = await _authService.LoginAsync(dto.Username, dto.Password);
            if (user == null)
                return Unauthorized("Invalid credentials");

            return Ok(user.UserId);
        }
    }
}
