using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokemonApi.Data;
using PokemonApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PokemonApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly PokemonContext _context;

        public PokemonController(PokemonContext context)
        {
            _context = context;
        }

        // GET: api/pokemon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pokemon>>> GetPokemon()
        {
            return await _context.Pokemon.ToListAsync();
        }

        // GET: api/pokemon/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pokemon>> GetPokemon(int id)
        {
            var pokemon = await _context.Pokemon.FindAsync(id);

            if (pokemon == null)
            {
                return NotFound();
            }

            return pokemon;
        }

        // GET: api/pokemon/name/pikachu
        [HttpGet("name/{name}")]
        public async Task<ActionResult<Pokemon>> GetPokemonByName(string name)
        {
            var pokemon = await _context.Pokemon
                .FirstOrDefaultAsync(p => p.Name.ToLower() == name.ToLower());

            if (pokemon == null)
            {
                return NotFound();
            }

            return pokemon;
        }

        // POST: api/pokemon
        [HttpPost]
        public async Task<ActionResult<Pokemon>> PostPokemon(Pokemon pokemon)
        {
            _context.Pokemon.Add(pokemon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPokemon", new { id = pokemon.Id }, pokemon);
        }

        // PUT: api/pokemon/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPokemon(int id, Pokemon pokemon)
        {
            if (id != pokemon.Id)
            {
                return BadRequest();
            }

            _context.Entry(pokemon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PokemonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/pokemon/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePokemon(int id)
        {
            var pokemon = await _context.Pokemon.FindAsync(id);
            if (pokemon == null)
            {
                return NotFound();
            }

            _context.Pokemon.Remove(pokemon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PokemonExists(int id)
        {
            return _context.Pokemon.Any(e => e.Id == id);
        }
    }
}