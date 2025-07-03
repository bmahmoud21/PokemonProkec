using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using PokemonApi.Models;
using PokemonApi.Services;
using PokemonApi.Repositories;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PokemonApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly PokemonService _pokemonService;
        private readonly UserPokemonService _userPokemonService;
        private readonly IPokemonRepository _pokemonRepository;

        public PokemonController(
            PokemonService pokemonService,
            UserPokemonService userPokemonService,
            IPokemonRepository pokemonRepository)
        {
            _pokemonService = pokemonService;
            _userPokemonService = userPokemonService;
            _pokemonRepository = pokemonRepository;
        }

        // GET: api/pokemon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pokemon>>> GetPokemon()
        {
            var pokemons = await _pokemonService.GetAllPokemonsAsync();
            return Ok(pokemons);
        }

        // GET: api/pokemon/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pokemon>> GetPokemon(int id)
        {
            var pokemon = await _pokemonService.GetPokemonByIdAsync(id);
            if (pokemon == null)
                return NotFound();
            return Ok(pokemon);
        }

        // GET: api/pokemon/name/pikachu
        [HttpGet("name/{name}")]
        public async Task<ActionResult<Pokemon>> GetPokemonByName(string name)
        {
            var pokemon = await _pokemonService.GetPokemonByNameAsync(name);
            if (pokemon == null)
                return NotFound();
            return Ok(pokemon);
        }

        // GET: api/pokemon/unused/{userId}
        [HttpGet("unused/{userId}")]
        public async Task<ActionResult<IEnumerable<Pokemon>>> GetUnusedPokemons(int userId)
        {
            var allPokemons = await _pokemonService.GetAllPokemonsAsync();
            var userPokemons = await _userPokemonService.GetUserPokemonsAsync(userId);
            var usedIds = userPokemons.Select(up => up.PokemonId).ToHashSet();
            var unused = allPokemons.Where(p => !usedIds.Contains(p.Id));
            return Ok(unused);
        }

        // POST: api/pokemon/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var imgsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imgs");

            if (!Directory.Exists(imgsFolder))
                Directory.CreateDirectory(imgsFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(imgsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativeUrl = $"/imgs/{fileName}";
            return Ok(relativeUrl);
        }

        // POST: api/pokemon
        [HttpPost]
        public async Task<ActionResult<Pokemon>> PostPokemon(Pokemon pokemon)
        {
            var created = await _pokemonService.CreatePokemonAsync(pokemon);
            return CreatedAtAction("GetPokemon", new { id = created.Id }, created);
        }

        // PUT: api/pokemon/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPokemon(int id, Pokemon pokemon)
        {
            if (id != pokemon.Id)
                return BadRequest();

            var updated = await _pokemonService.UpdatePokemonAsync(id, pokemon);
            if (updated == null)
                return NotFound();

            return NoContent();
        }

        // DELETE: api/pokemon/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePokemon(int id)
        {
            var deleted = await _pokemonService.DeletePokemonAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
