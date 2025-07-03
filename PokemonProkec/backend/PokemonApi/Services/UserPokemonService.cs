using System.Collections.Generic;
using System.Threading.Tasks;
using PokemonApi.Models; 
using PokemonApi.Repositories;

namespace PokemonApi.Services
{
    public class UserPokemonService
    {
        private readonly IUserPokemonRepository _userPokemonRepository;

        public UserPokemonService(IUserPokemonRepository userPokemonRepository)
        {
            _userPokemonRepository = userPokemonRepository;
        }

        public async Task<IEnumerable<UserPokemon>> GetUserPokemonsAsync(int userId)
        {
            return await _userPokemonRepository.GetUserPokemonsAsync(userId);
        }

        public async Task<UserPokemon> AddPokemonToUserAsync(int userId, UserPokemon userPokemon)
        {
            return await _userPokemonRepository.AddPokemonToUserAsync(userId, userPokemon);
        }

        public async Task<bool> RemovePokemonFromUserAsync(int userId, int pokemonId)
        {
            return await _userPokemonRepository.RemovePokemonFromUserAsync(userId, pokemonId);
        }

        public async Task<UserPokemon?> UpdateUserPokemonAsync(int userId, int pokemonId, UserPokemon updateData)
        {
            return await _userPokemonRepository.UpdateUserPokemonAsync(userId, pokemonId, updateData);
        }
    }
}