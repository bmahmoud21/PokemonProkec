using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokemonApi.Data;
using PokemonApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PokemonController : ControllerBase
{
    private readonly PokemonContext _context;

    public PokemonController(PokemonContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllPokemon()
    {
        var pokemonList = await _context.Pokemon.ToListAsync();
        return Ok(pokemonList); 
    }

}
