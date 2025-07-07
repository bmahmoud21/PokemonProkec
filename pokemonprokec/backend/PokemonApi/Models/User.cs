using System.Collections.Generic;

public class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public ICollection<UserPokemon> UserPokemons { get; set; } = new List<UserPokemon>();
}
