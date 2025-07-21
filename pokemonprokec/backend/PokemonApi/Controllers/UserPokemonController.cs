using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;
using PokemonApi.Services;

[Route("api/[controller]")]
[ApiController]
public class UserPokemonController : ControllerBase
{
    private readonly UserPokemonService _userPokemonService;
    private readonly PokemonService _pokemonService;

    public UserPokemonController(UserPokemonService userPokemonService, PokemonService pokemonService)
    {
        _userPokemonService = userPokemonService;
        _pokemonService = pokemonService;
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

    [HttpGet("all/{userId}")]
    public async Task<IActionResult> GetAllUserPokemons(int userId)
    {
        var userPokemons = await _userPokemonService.GetUserPokemonsAsync(userId);
        var allPokemon = await _pokemonService.GetAllPokemonsAsync();
        var userPokemonList = userPokemons
            .Select(up => allPokemon.FirstOrDefault(p => p.Id == up.PokemonId))
            .Where(p => p != null)
            .ToList();
        return Ok(userPokemonList);
    }
}
