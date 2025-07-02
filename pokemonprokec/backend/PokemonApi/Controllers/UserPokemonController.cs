using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokemonApi.Data;
using PokemonApi.Models;
using Microsoft.EntityFrameworkCore;



[Route("api/[controller]")]
[ApiController]
public class UserPokemonController : ControllerBase
{
    private readonly PokemonContext _context;

    public UserPokemonController(PokemonContext context)
    {
        _context = context;
    }

    [HttpPost("select")]
    public async Task<IActionResult> SelectPokemon([FromBody] PokemonSelectionDto selection)
    {
        if (!_context.Users.Any(u => u.UserId == selection.UserId))
            return NotFound("User not found");

        // Get all Pokémon the user has already used
        var existingPokemonIds = _context.UserPokemons
            .Where(up => up.UserId == selection.UserId)
            .Select(up => up.PokemonId)
            .ToHashSet();

        // Add only new Pokémon that haven't been used before
        foreach (var pid in selection.PokemonIds)
        {
            if (!existingPokemonIds.Contains(pid))
            {
                _context.UserPokemons.Add(new UserPokemon { UserId = selection.UserId, PokemonId = pid });
            }
        }

        await _context.SaveChangesAsync();
        return Ok("Selection saved.");
    }



    [HttpGet("selected/{userId}")]
    public async Task<ActionResult<IEnumerable<Pokemon>>> GetSelectedPokemon(int userId)
    {
        return await _context.UserPokemons
            .Where(up => up.UserId == userId)
            .Select(up => up.Pokemon)
            .ToListAsync();
    }
}
