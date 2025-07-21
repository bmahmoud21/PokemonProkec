using System.Collections.Generic;
using System.Threading.Tasks;
using PokemonApi.Models;
using System.Linq;
using PokemonApi.Data;
using Microsoft.EntityFrameworkCore;

namespace PokemonApi.Repositories
{
    public interface IUserPokemonRepository
    {
        Task<IEnumerable<UserPokemon>> GetUserPokemonsAsync(int userId);
        Task<UserPokemon> AddPokemonToUserAsync(int userId, UserPokemon userPokemon);
        Task<bool> RemovePokemonFromUserAsync(int userId, int pokemonId);
        Task<UserPokemon?> UpdateUserPokemonAsync(int userId, int pokemonId, UserPokemon updateData);
    }

    public class UserPokemonRepository : IUserPokemonRepository
    {
        private readonly PokemonContext _context;

        public UserPokemonRepository(PokemonContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserPokemon>> GetUserPokemonsAsync(int userId)
        {
            return await _context.UserPokemons
                .Where(up => up.UserId == userId)
                .ToListAsync();
        }

        public async Task<UserPokemon> AddPokemonToUserAsync(int userId, UserPokemon userPokemon)
        {
            userPokemon.UserId = userId;
            _context.UserPokemons.Add(userPokemon);
            await _context.SaveChangesAsync();
            return userPokemon;
        }

        public async Task<bool> RemovePokemonFromUserAsync(int userId, int pokemonId)
        {
            var userPokemon = await _context.UserPokemons
                .FirstOrDefaultAsync(up => up.UserId == userId && up.PokemonId == pokemonId);
            if (userPokemon == null) return false;

            _context.UserPokemons.Remove(userPokemon);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserPokemon?> UpdateUserPokemonAsync(int userId, int pokemonId, UserPokemon updateData)
        {
            var userPokemon = await _context.UserPokemons
                .FirstOrDefaultAsync(up => up.UserId == userId && up.PokemonId == pokemonId);
            if (userPokemon == null) return null;

            // Update properties as needed, e.g.:
            // userPokemon.SomeProperty = updateData.SomeProperty;

            await _context.SaveChangesAsync();
            return userPokemon;
        }
    }
}