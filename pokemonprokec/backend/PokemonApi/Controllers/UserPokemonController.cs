using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;
using PokemonApi.Services;

[Route("api/[controller]")]
[ApiController]
public class UserPokemonController : ControllerBase
{
    private readonly UserPokemonService _userPokemonService;

    public UserPokemonController(UserPokemonService userPokemonService)
    {
        _userPokemonService = userPokemonService;
    }

    [HttpPost("select")]
    public async Task<IActionResult> SelectPokemon([FromBody] PokemonSelectionDto selection)
    {
        foreach (var pid in selection.PokemonIds)
        {
            var userPokemon = new UserPokemon { UserId = selection.UserId, PokemonId = pid };
            await _userPokemonService.AddPokemonToUserAsync(selection.UserId, userPokemon);
        }
        return Ok("Selection saved.");
    }

    [HttpGet("selected/{userId}")]
    public async Task<ActionResult<IEnumerable<UserPokemon>>> GetSelectedPokemon(int userId)
    {
        var userPokemons = await _userPokemonService.GetUserPokemonsAsync(userId);
        return Ok(userPokemons);
    }
}
