using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;
using PokemonApi.Data;
using System;
using System.Threading.Tasks;

namespace PokemonApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly PokemonContext _context;

        public UsersController(PokemonContext context)
        {
            _context = context;
        }

        [HttpPost("guest")]
        public async Task<ActionResult<User>> CreateGuestUser()
        {
            var guest = new User
            {
                Username = $"Guest-{Guid.NewGuid()}",
                PasswordHash = "" // or some dummy value
            };
            _context.Users.Add(guest);
            await _context.SaveChangesAsync();
            return Ok(guest);
        }
    }
}