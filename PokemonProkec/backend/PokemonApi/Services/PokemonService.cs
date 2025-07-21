using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PokemonApi.Models; // Adjust as needed
using PokemonApi.Repositories;

namespace PokemonApi.Services
{
    public class PokemonService
    {
        private readonly IPokemonRepository _pokemonRepository;

        public PokemonService(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }

        public async Task<IEnumerable<Pokemon>> GetAllPokemonsAsync()
        {
            return await _pokemonRepository.GetAllPokemonsAsync();
        }

        public async Task<Pokemon> GetPokemonByIdAsync(int id)
        {
            return await _pokemonRepository.GetPokemonByIdAsync(id);
        }

        public async Task<Pokemon> CreatePokemonAsync(Pokemon pokemon)
        {
            return await _pokemonRepository.CreatePokemonAsync(pokemon);
        }

        public async Task<Pokemon> UpdatePokemonAsync(int id, Pokemon pokemon)
        {
            return await _pokemonRepository.UpdatePokemonAsync(id, pokemon);
        }

        public async Task<bool> DeletePokemonAsync(int id)
        {
            return await _pokemonRepository.DeletePokemonAsync(id);
        }

        public async Task<Pokemon?> GetPokemonByNameAsync(string name)
        {
            var allPokemons = await _pokemonRepository.GetAllPokemonsAsync();
            return allPokemons.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<IEnumerable<Pokemon>> GetPokemonsByIdsAsync(IEnumerable<int> ids)
        {
            return await _pokemonRepository.GetPokemonsByIdsAsync(ids);
        }
    }
}