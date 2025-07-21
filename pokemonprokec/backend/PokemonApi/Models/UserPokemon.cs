using PokemonApi.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class UserPokemon
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int PokemonId { get; set; }
    public Pokemon Pokemon { get; set; } = null!;
}
