using System.Collections.Generic;
using System.Threading.Tasks;
using PokemonApi.Models;
using System.Linq;
using PokemonApi.Data;
using Microsoft.EntityFrameworkCore;

namespace PokemonApi.Repositories
{
    public interface IPokemonRepository
    {
        Task<IEnumerable<Pokemon>> GetAllPokemonsAsync();
        Task<Pokemon?> GetPokemonByIdAsync(int id);
        Task<Pokemon> CreatePokemonAsync(Pokemon pokemon);
        Task<Pokemon?> UpdatePokemonAsync(int id, Pokemon pokemon);
        Task<bool> DeletePokemonAsync(int id);
        Task<IEnumerable<Pokemon>> GetPokemonsByIdsAsync(IEnumerable<int> ids);
    }

    public class PokemonRepository : IPokemonRepository
    {
        private readonly PokemonContext _context;

        public PokemonRepository(PokemonContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pokemon>> GetAllPokemonsAsync()
        {
            return await _context.Pokemon.ToListAsync();
        }

        public async Task<Pokemon?> GetPokemonByIdAsync(int id)
        {
            return await _context.Pokemon.FindAsync(id);
        }

        public async Task<Pokemon> CreatePokemonAsync(Pokemon pokemon)
        {
            _context.Pokemon.Add(pokemon);
            await _context.SaveChangesAsync();
            return pokemon;
        }

        public async Task<Pokemon?> UpdatePokemonAsync(int id, Pokemon pokemon)
        {
            var existing = await _context.Pokemon.FindAsync(id);
            if (existing == null) return null;

            existing.Name = pokemon.Name;
            existing.ImageUrl = pokemon.ImageUrl;
            existing.Summary = pokemon.Summary;
            existing.GifUrl = pokemon.GifUrl;
            existing.Pokedex = pokemon.Pokedex;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeletePokemonAsync(int id)
        {
            var pokemon = await _context.Pokemon.FindAsync(id);
            if (pokemon == null) return false;

            _context.Pokemon.Remove(pokemon);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Pokemon>> GetPokemonsByIdsAsync(IEnumerable<int> ids)
        {
            return await _context.Pokemon.Where(p => ids.Contains(p.Id)).ToListAsync();
        }
    }
}